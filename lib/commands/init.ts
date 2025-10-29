import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { logger } from '../utils/logger.js';
import { validateProjectName } from '../utils/validators.js';
import { saveConfig, getExtension } from '../utils/config-loader.js';
import type { InitOptions } from '../../types/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function initCommand(name?: string, options: InitOptions = {}): Promise<void> {
  console.log(chalk.bold.cyan('\n🚀 Welcome to FolioPort!\n'));
  console.log(chalk.gray('Let\'s create your amazing developer portfolio...\n'));

  // Interactive prompts
  const responses = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: 'Where should we create your portfolio?',
      initial: name || 'my-portfolio',
      hint: 'Use "." for current directory',
      validate: (value: string) => {
        if (value === '.') return true;
        const validation = validateProjectName(value);
        return validation.valid || validation.errors.join(', ');
      }
    },
    {
      type: 'text', 
      name: 'fullName',
      message: 'What\'s your full name?',
      initial: 'Your Name',
      validate: (value: string) => value.length > 0 || 'Name is required'
    },
    {
      type: 'text',
      name: 'email',
      message: 'What\'s your email address?',
      initial: 'your.email@example.com',
      validate: (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) || 'Please enter a valid email';
      }
    },
    {
      type: 'select',
      name: 'configFormat',
      message: 'Which configuration format would you like to use?',
      choices: [
        { title: 'JSON', value: 'json', description: 'Easy to read and write' },
        { title: 'YAML', value: 'yaml', description: 'Human-friendly format' },
        { title: 'TOML', value: 'toml', description: 'Configuration focused' }
      ],
      initial: 0
    },
    {
      type: 'confirm',
      name: 'installDeps',
      message: 'Would you like to install dependencies automatically?',
      initial: true
    },
    {
      type: prev => prev ? 'confirm' : null,
      name: 'startServer',
      message: 'Start the development server after setup?',
      initial: true
    }
  ], {
    onCancel: () => {
      console.log(chalk.red('\n❌ Setup cancelled.'));
      process.exit(1);
    }
  });

  const { projectName, fullName, email, configFormat, installDeps, startServer } = responses;
  
  const isCurrentDir = projectName === '.';
  let projectPath: string;
  let actualProjectName: string;
  
  if (isCurrentDir) {
    actualProjectName = path.basename(process.cwd());
    projectPath = process.cwd();
  } else {
    actualProjectName = projectName;
    projectPath = path.join(process.cwd(), projectName);
  }
  
  // Check if directory already exists (skip for current directory)
  if (!isCurrentDir && await fs.pathExists(projectPath)) {
    logger.error(`Directory "${projectName}" already exists!`);
    process.exit(1);
  }

  // For current directory, check if it's empty or warn about existing files
  if (isCurrentDir) {
    const files = await fs.readdir(projectPath);
    const ignoreFiles = ['.git', '.gitignore', 'README.md', 'LICENSE'];
    const existingFiles = files.filter(file => !ignoreFiles.includes(file));
    
    if (existingFiles.length > 0) {
      logger.warning('Current directory is not empty. Files may be overwritten.');
      logger.info('Existing files: ' + existingFiles.slice(0, 5).join(', ') + (existingFiles.length > 5 ? '...' : ''));
    }
  }

  const spinner = ora('Creating portfolio project...').start();
  
  try {
    // Create project directory
    await fs.ensureDir(projectPath);
    
    // Copy theme files
    const templatesDir = path.join(__dirname, '../../../templates');
    const themePath = path.join(templatesDir, 'default');
    
    if (!await fs.pathExists(themePath)) {
      spinner.fail(chalk.red(`Theme "${options.theme || 'default'}" not found`));
      logger.warning('Available themes: default');
      if (!isCurrentDir) {
        await fs.remove(projectPath);
      }
      process.exit(1);
    }

    spinner.text = 'Copying theme files...';
    await fs.copy(themePath, projectPath);
    
    // Create config file
    spinner.text = 'Creating configuration...';
    const config = {
      name: projectName,
      version: '1.0.0',
      theme: options.theme,
      generator: 'folioport',
      author: {
        name: 'Your Name',
        email: 'hello@example.com'
      },
      site: {
        url: `https://${projectName}.com`,
        title: `${projectName} Portfolio`,
        description: 'My developer portfolio',
        language: 'en',
        favicon: 'favicon.svg'
      },
      features: {
        darkMode: true,
        blog: false,
        analytics: false,
        contactForm: false
      },
      social: {
        github: '',
        linkedin: '',
        twitter: ''
      },
      seo: {
        keywords: ['developer', 'portfolio', 'software engineer'],
        ogImage: 'assets/og-image.jpg',
        twitterCard: 'summary_large_image'
      },
      build: {
        output: 'dist',
        minify: true,
        sourceMaps: false,
        imageOptimization: true
      }
    };
    
    const configExt = getExtension(configFormat);
    await saveConfig(
      path.join(projectPath, `portfolio.config${configExt}`),
      config,
      configFormat
    );
    
    // Create data file with starter content
    spinner.text = 'Creating starter content...';
    const starterData = getStarterData(actualProjectName, fullName, email);
    const dataExt = getExtension(configFormat);
    await saveConfig(
      path.join(projectPath, `data${dataExt}`),
      starterData,
      configFormat
    );
    
    // Create package.json
    const packageJson = {
      name: projectName,
      version: '1.0.0',
      description: `Portfolio website for ${projectName}`,
      type: 'module',
      scripts: {
        dev: 'folioport dev',
        build: 'folioport build',
        preview: 'folioport dev --port 8080'
      }
      // Note: folioport should be installed globally or linked
      // devDependencies: {
      //   folioport: '^1.0.0'
      // }
    };
    
    await fs.writeJSON(
      path.join(projectPath, 'package.json'),
      packageJson,
      { spaces: 2 }
    );
    
    // Initialize git if requested
    if (options.git) {
      spinner.text = 'Initializing git repository...';
      try {
        execSync('git init', { cwd: projectPath, stdio: 'ignore' });
        
        const gitignore = `node_modules/
dist/
.dev/
.DS_Store
*.log
.env
.env.local
`;
        await fs.writeFile(path.join(projectPath, '.gitignore'), gitignore);
      } catch (_error) {
        logger.warning('Failed to initialize git repository');
      }
    }
    
    // Install dependencies if requested
    if (installDeps) {
      spinner.text = 'Installing dependencies...';
      try {
        // Check if npm is available
        execSync('npm --version', { stdio: 'ignore' });
        
        // Install dependencies in the project directory
        process.chdir(projectPath);
        execSync('npm install', { stdio: 'inherit' });
        
        spinner.text = 'Dependencies installed successfully...';
      } catch (_error) {
        spinner.warn('Failed to install dependencies automatically');
        logger.warning('You can install them later by running: npm install');
      }
    }
    
    spinner.succeed(chalk.green('Portfolio project created successfully!'));
    
    // Show completion message
    console.log('\n' + chalk.bold('🎉 Success! Your portfolio is ready.'));
    
    const configFile = `portfolio.config${getExtension(configFormat)}`;
    const dataFile = `data${getExtension(configFormat)}`;
    
    // Show what was created
    console.log('\n' + chalk.bold('📁 Created:'));
    console.log(chalk.gray(`  ├── ${dataFile} (your portfolio content)`));
    console.log(chalk.gray(`  ├── ${configFile} (configuration)`));
    console.log(chalk.gray('  ├── package.json (project setup)'));
    console.log(chalk.gray('  └── assets/ (images, styles, scripts)'));
    
    // Start server if requested
    if (startServer && installDeps) {
      console.log('\n' + chalk.bold('🚀 Starting development server...'));
      try {
        // Import and run the dev command
        const { devCommand } = await import('./dev.js');
        await devCommand();
      } catch (_error) {
        logger.warning('Failed to start development server automatically');
        console.log('\n' + chalk.bold('Manual start:'));
        if (!isCurrentDir) console.log(chalk.cyan(`  cd ${projectName}`));
        console.log(chalk.cyan('  folioport dev'));
      }
    } else {
      // Show next steps
      console.log('\n' + chalk.bold('Next steps:'));
      if (!isCurrentDir) console.log(chalk.cyan(`  cd ${projectName}`));
      if (!installDeps) console.log(chalk.cyan('  npm install'));
      console.log(chalk.cyan('  folioport dev'));
      
      console.log('\n' + chalk.gray(`� Edit ${dataFile} to customize your portfolio`));
      console.log(chalk.gray(`⚙️  Edit ${configFile} to configure settings`));
      console.log(chalk.gray('🎨 Edit assets/css/styles.css to customize styling'));
    }
    console.log(chalk.gray('   npm install -g folioport\n'));
    
  } catch (error) {
    spinner.fail(chalk.red('Failed to create project'));
    console.error(error);
    
    // Cleanup on failure
    if (!isCurrentDir) {
      try {
        await fs.remove(projectPath);
      } catch (_cleanupError) {
        // Ignore cleanup errors
      }
    }
    
    process.exit(1);
  }
}

function getStarterData(_projectName: string, fullName: string, email: string): any {
  return {
    hero: {
      name: fullName,
      tagline: 'Software Developer',
      description: 'Building amazing things on the web',
      image: 'assets/profile.jpg',
      resume: 'assets/resume.pdf',
      email: email,
      cta: {
        primary: {
          text: 'Get In Touch',
          link: `mailto:${email}`
        },
        secondary: {
          text: 'View Projects',
          link: '#projects'
        }
      }
    },
    about: {
      title: 'About Me',
      paragraphs: [
        'I am a passionate developer with expertise in modern web technologies.',
        'I love creating beautiful, functional, and user-friendly applications.'
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'CSS', 'Python', 'Git']
    },
    experience: {
      title: 'Experience',
      items: [
        {
          role: 'Software Developer',
          company: 'Tech Company',
          period: '2022 - Present',
          description: 'Building scalable web applications and leading frontend development.',
          technologies: ['React', 'TypeScript', 'Node.js']
        }
      ]
    },
    projects: {
      title: 'Projects',
      items: [
        {
          title: 'Sample Project',
          description: 'A great project showcasing my skills',
          technologies: ['React', 'Node.js', 'MongoDB'],
          link: 'https://github.com',
          demo: 'https://example.com',
          image: 'assets/project1.jpg'
        }
      ]
    },
    education: {
      title: 'Education',
      items: [
        {
          degree: 'Bachelor of Science in Computer Science',
          institution: 'University Name',
          period: '2018 - 2022',
          description: 'Focused on software engineering and web development'
        }
      ]
    },
    contact: {
      title: 'Get In Touch',
      description: 'Feel free to reach out for collaborations or just a friendly chat!',
      email: 'hello@example.com'
    },
    social: {
      github: 'yourusername',
      linkedin: 'yourusername',
      twitter: 'yourusername',
      email: 'hello@example.com'
    }
  };
}

