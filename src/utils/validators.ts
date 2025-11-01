export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateConfig(config: any): ValidationResult {
  const errors: string[] = [];

  if (!config.site) {
    errors.push('Missing required field: site');
  } else {
    if (!config.site.url) {
      errors.push('Missing required field: site.url');
    }
    if (!config.site.title) {
      errors.push('Missing required field: site.title');
    }
  }

  if (!config.theme) {
    errors.push('Missing required field: theme');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateData(data: any): ValidationResult {
  const errors: string[] = [];

  if (!data.hero) {
    errors.push('Missing required section: hero');
  } else {
    if (!data.hero.name) {
      errors.push('Missing required field: hero.name');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateProjectName(name: string): ValidationResult {
  const errors: string[] = [];

  if (!name) {
    errors.push('Project name is required');
  }

  if (name && !/^[a-z0-9-_]+$/i.test(name)) {
    errors.push('Project name can only contain letters, numbers, dashes, and underscores');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

