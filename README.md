# Font Converter

A simple Node.js script to convert OpenType Font (.otf) files to Web Open Font Format (.woff and .woff2) for use on websites.

## Requirements

Before using this script, you need to install the required dependencies:

```bash
npm install fonteditor-core fs-extra path
```

## Directory Structure

The script expects the following directory structure:

```
project/
├── OTF/                # Input directory containing .otf font files
├── WOFF/               # Output directory for .woff files (created automatically)
├── WOFF2/              # Output directory for .woff2 files (created automatically)
└── convert-fonts.js    # The conversion script
```

## Usage

1. Place all your .otf font files in the `OTF` directory.
2. Run the script:

```bash
node convert-fonts.js
```

3. The script will:
   - Find all .otf files in the OTF directory
   - Convert each font to both WOFF and WOFF2 formats
   - Save the converted files to their respective directories
   - Display a summary of the conversion process

## Example Output

```
Reading directory: ./OTF
Found 16 OTF files.
Reading font: OTF\Sofia Pro Black Az.otf
Created: WOFF\Sofia Pro Black Az.woff
Created: WOFF2\Sofia Pro Black Az.woff2
...
Conversion Summary:
Total OTF files found: 16
Successfully converted: 16
```

## Using the Fonts in CSS

After conversion, you can use the fonts in your website CSS:

```css
@font-face {
  font-family: 'Sofia Pro';
  src: url('WOFF2/SofiaProRegular.woff2') format('woff2'),
       url('WOFF/SofiaProRegular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

## Troubleshooting

If you encounter any issues:

1. Ensure all dependencies are installed
2. Check that your .otf files are in the correct directory
3. Verify that your fonts are valid OpenType format files

## License

This script is provided as-is under the MIT License. 
