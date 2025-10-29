import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { logger } from '../utils/logger.js';
import { validateProjectName } from '../utils/validators.js';
import { saveConfig, getExtension } from '../utils/config-loader.js';
import type { InitOptions } from '../../types/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function initCommand(name?: string, options: InitOptions = {}): Promise<void> {
  const inputName = name || 'my-portfolio';
  const isCurrentDir = inputName === '.';
  
  // Get the actual project name and path
  let projectName: string;
  let projectPath: string;
  
  if (isCurrentDir) {
    // Use current directory name as project name
    projectName = path.basename(process.cwd());
    projectPath = process.cwd();
  } else {
    projectName = inputName;
    projectPath = path.join(process.cwd(), projectName);
  }
  
  // Validate project name (but allow '.' as a special case)
  if (!isCurrentDir) {
    const validation = validateProjectName(projectName);
    if (!validation.valid) {
      logger.error('Invalid project name:');
      validation.errors.forEach((err: string) => console.log('  ' + err));
      process.exit(1);
    }
  }

  // Determine config format (default to JSON)
  const configFormat = options.format || 'json';
  if (!['json', 'yaml', 'yml', 'toml'].includes(configFormat.toLowerCase())) {
    logger.error(`Invalid format: ${configFormat}. Use json, yaml, or toml.`);
    process.exit(1);
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
    const themePath = path.join(templatesDir, options.theme || 'default');
    
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
    const starterData = getStarterData(projectName);
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
      } catch (error) {
        logger.warning('Failed to initialize git repository');
      }
    }
    
    // Install dependencies if requested (skip if no dependencies)
    if (options.install) {
      spinner.text = 'Checking dependencies...';
      // Since we don't include folioport as a dependency in the generated package.json,
      // there's nothing to install. This is intentional - users should install folioport globally.
      spinner.text = 'Project setup complete...';
    }
    
    spinner.succeed(chalk.green('Portfolio project created successfully!'));
    
    // Show next steps
    console.log('\n' + chalk.bold('🎉 Success! Your portfolio is ready.'));
    console.log('\n' + chalk.bold('Next steps:'));
    console.log(chalk.cyan(`  cd ${projectName}`));
    console.log(chalk.cyan('  npm run dev'));
    
    const configFile = `portfolio.config${getExtension(configFormat)}`;
    const dataFile = `data${getExtension(configFormat)}`;
    
    console.log('\n' + chalk.gray(`📝 Edit ${dataFile} to customize your portfolio`));
    console.log(chalk.gray(`⚙️  Edit ${configFile} to configure settings`));
    console.log(chalk.gray('🎨 Edit assets/css/styles.css to customize styling'));
    console.log('\n' + chalk.bold('Build for production:'));
    console.log(chalk.cyan('  npm run build'));
    console.log('\n' + chalk.gray('💡 Tip: Make sure folioport is installed globally or linked'));
    console.log(chalk.gray('   npm install -g folioport\n'));
    
  } catch (error) {
    spinner.fail(chalk.red('Failed to create project'));
    console.error(error);
    
    // Cleanup on failure
    if (!isCurrentDir) {
      try {
        await fs.remove(projectPath);
      } catch (cleanupError) {
        // Ignore cleanup errors
      }
    }
    
    process.exit(1);
  }
}

function getStarterData(_projectName: string): any {
  return {
    hero: {
      name: 'Your Name',
      tagline: 'Software Developer',
      description: 'Building amazing things on the web',
      image: 'assets/profile.jpg',
      resume: 'assets/resume.pdf',
      email: 'hello@example.com',
      cta: {
        primary: {
          text: 'Get In Touch',
          link: 'mailto:hello@example.com'
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

