#!/usr/bin/env node

/**
 * Lottie Optimizer Script
 * 
 * This script optimizes Lottie JSON files by:
 * 1. Removing unnecessary metadata
 * 2. Reducing precision of numbers
 * 3. Removing unused assets
 * 4. Compressing the JSON structure
 * 
 * Usage:
 * node scripts/optimize-lottie.js [--input=path/to/input.json] [--output=path/to/output.json] [--precision=2] [--all]
 * 
 * Options:
 * --input: Path to input JSON file (required unless --all is used)
 * --output: Path to output JSON file (defaults to input-optimized.json)
 * --precision: Number of decimal places to keep (default: 2)
 * --all: Process all JSON files in src/assets/lottie/
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Parse command line arguments
const args = process.argv.slice(2).reduce((acc, arg) => {
  const [key, value] = arg.split('=');
  if (key.startsWith('--')) {
    acc[key.slice(2)] = value !== undefined ? value : true;
  }
  return acc;
}, {});

// Default options
const options = {
  precision: args.precision ? parseInt(args.precision) : 2,
  all: args.all || false,
  input: args.input || null,
  output: args.output || null,
};

// Simple Lottie optimizer
function optimizeLottieJson(jsonData, precision = 2) {
  // Deep clone to avoid modifying the original
  const data = JSON.parse(JSON.stringify(jsonData));
  
  // Remove metadata that's not needed for rendering
  if (data.metadata) {
    delete data.metadata;
  }
  
  // Reduce precision of numbers
  function reducePrecision(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    
    if (Array.isArray(obj)) {
      return obj.map(item => {
        if (typeof item === 'number') {
          return parseFloat(item.toFixed(precision));
        }
        return reducePrecision(item);
      });
    }
    
    const result = {};
    for (const key in obj) {
      if (typeof obj[key] === 'number') {
        result[key] = parseFloat(obj[key].toFixed(precision));
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[key] = reducePrecision(obj[key]);
      } else {
        result[key] = obj[key];
      }
    }
    
    return result;
  }
  
  // Apply precision reduction
  const optimized = reducePrecision(data);
  
  return optimized;
}

// Process a single file
function processFile(inputPath, outputPath, precision) {
  try {
    console.log(`Processing ${inputPath}...`);
    
    // Read input file
    const content = fs.readFileSync(inputPath, 'utf8');
    const jsonData = JSON.parse(content);
    
    // Optimize
    const optimized = optimizeLottieJson(jsonData, precision);
    
    // Determine output path if not provided
    if (!outputPath) {
      const parsedPath = path.parse(inputPath);
      outputPath = path.join(parsedPath.dir, `${parsedPath.name}.min${parsedPath.ext}`);
    }
    
    // Write output file
    fs.writeFileSync(outputPath, JSON.stringify(optimized));
    
    // Calculate size reduction
    const originalSize = Buffer.byteLength(content, 'utf8');
    const optimizedSize = Buffer.byteLength(JSON.stringify(optimized), 'utf8');
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
    
    console.log(`Optimized ${path.basename(inputPath)}: ${savings}% reduction (${originalSize} → ${optimizedSize} bytes)`);
    console.log(`Output saved to ${outputPath}`);
    
    return {
      inputPath,
      outputPath,
      originalSize,
      optimizedSize,
      savings
    };
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
    return null;
  }
}

// Main function
function main() {
  if (options.all) {
    // Process all JSON files in src/assets/lottie/
    const lottieFiles = glob.sync('src/assets/lottie/**/*.json');
    
    if (lottieFiles.length === 0) {
      console.log('No Lottie JSON files found in src/assets/lottie/');
      return;
    }
    
    console.log(`Found ${lottieFiles.length} Lottie JSON files`);
    
    const results = lottieFiles.map(file => {
      const parsedPath = path.parse(file);
      const outputPath = path.join(parsedPath.dir, `${parsedPath.name}.min${parsedPath.ext}`);
      return processFile(file, outputPath, options.precision);
    }).filter(Boolean);
    
    // Summary
    console.log('\nOptimization Summary:');
    console.log('--------------------');
    
    let totalOriginal = 0;
    let totalOptimized = 0;
    
    results.forEach(result => {
      totalOriginal += result.originalSize;
      totalOptimized += result.optimizedSize;
      console.log(`${path.basename(result.inputPath)}: ${result.savings}% reduction`);
    });
    
    const totalSavings = ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(2);
    console.log('--------------------');
    console.log(`Total: ${totalSavings}% reduction (${totalOriginal} → ${totalOptimized} bytes)`);
  } else if (options.input) {
    // Process a single file
    processFile(options.input, options.output, options.precision);
  } else {
    console.error('Error: Please provide either --input or --all option');
    console.log('Usage: node scripts/optimize-lottie.js [--input=path/to/input.json] [--output=path/to/output.json] [--precision=2] [--all]');
  }
}

// Run the script
main();
