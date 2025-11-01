import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

describe('Utility Functions', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'folioport-test-'));
  });

  afterEach(async () => {
    await fs.remove(tempDir);
  });

  describe('Basic functionality', () => {
    it('should validate object structure', () => {
      const testObject = {
        name: 'John Doe',
        email: 'john@example.com'
      };

      expect(testObject.name).toBe('John Doe');
      expect(testObject.email).toContain('@');
    });

    it('should handle JSON operations', () => {
      const testData = { version: '1.0.0', name: 'folioport' };
      const jsonString = JSON.stringify(testData);
      const parsed = JSON.parse(jsonString);
      
      expect(parsed.name).toBe('folioport');
      expect(parsed.version).toBe('1.0.0');
    });
  });

  describe('File System Operations', () => {
    it('should create and remove temporary directories', async () => {
      const testDir = path.join(tempDir, 'test-folder');
      
      // Create directory
      await fs.ensureDir(testDir);
      expect(await fs.pathExists(testDir)).toBe(true);
      
      // Write file
      const testFile = path.join(testDir, 'test.json');
      await fs.writeJson(testFile, { test: true });
      expect(await fs.pathExists(testFile)).toBe(true);
      
      // Read file
      const data = await fs.readJson(testFile);
      expect(data.test).toBe(true);
    });

    it('should handle path operations', () => {
      const testPath = path.join('lib', 'utils', 'test.ts');
      expect(testPath).toContain('lib');
      expect(testPath).toContain('utils');
      expect(path.extname(testPath)).toBe('.ts');
    });
  });
});