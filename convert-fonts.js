/**
 * Simple Font Converter: OTF to WOFF and WOFF2
 * Converts all OTF files in the OTF directory to WOFF and WOFF2 formats
 */

const fonteditorCore = require('fonteditor-core');
const Font = fonteditorCore.Font;
const woff2 = fonteditorCore.woff2;  // Get woff2 module
const fs = require('fs-extra');
const path = require('path');

// Initialize woff2 module
woff2.init();

// Input and output directories
const inputDir = './OTF';
const woffDir = './WOFF';
const woff2Dir = './WOFF2';

// Ensure output directories exist
fs.ensureDirSync(woffDir);
fs.ensureDirSync(woff2Dir);

// Function to convert a single font file
async function convertFont(inputFile, fontName) {
    try {
        // Read the font file
        console.log(`Reading font: ${inputFile}`);
        const buffer = await fs.readFile(inputFile);
        
        // Initialize the font
        const font = Font.create(buffer, {
            type: 'otf',
            hinting: true
        });
        
        // Convert to WOFF
        const woffBuffer = font.write({
            type: 'woff',
            hinting: true
        });
        const woffPath = path.join(woffDir, `${fontName}.woff`);
        await fs.writeFile(woffPath, woffBuffer);
        console.log(`Created: ${woffPath}`);
        
        // Convert to WOFF2
        const woff2Buffer = font.write({
            type: 'woff2',
            hinting: true
        });
        const woff2Path = path.join(woff2Dir, `${fontName}.woff2`);
        await fs.writeFile(woff2Path, woff2Buffer);
        console.log(`Created: ${woff2Path}`);
        
        return true;
    } catch (error) {
        console.error(`Error converting ${inputFile}: ${error.message}`);
        return false;
    }
}

// Main function
async function main() {
    try {
        // Get all files in the input directory
        console.log(`Reading directory: ${inputDir}`);
        const files = await fs.readdir(inputDir);
        
        // Filter for .otf files (case insensitive)
        const otfFiles = files.filter(file => file.toLowerCase().endsWith('.otf'));
        
        console.log(`Found ${otfFiles.length} OTF files.`);
        
        // Convert each file
        let successCount = 0;
        for (const file of otfFiles) {
            const inputPath = path.join(inputDir, file);
            const fontName = path.basename(file, path.extname(file));
            
            if (await convertFont(inputPath, fontName)) {
                successCount++;
            }
        }
        
        // Print summary
        console.log(`\nConversion Summary:`);
        console.log(`Total OTF files found: ${otfFiles.length}`);
        console.log(`Successfully converted: ${successCount}`);
        
        if (otfFiles.length !== successCount) {
            console.log(`Failed conversions: ${otfFiles.length - successCount}`);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

// Run the script
main().catch(error => {
    console.error(`Fatal error: ${error.message}`);
    process.exit(1);
}); 