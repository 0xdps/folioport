declare module 'html-minifier-terser' {
  export function minify(html: string, options?: any): Promise<string>;
}

declare module 'chokidar' {
  export function watch(paths: string | string[], options?: any): any;
}