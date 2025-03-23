# Screen Reader

A simple and accessible screen reader implementation using JavaScript and a text-to-speech API. This project enhances web accessibility by allowing users to interact with web content through audio feedback.

## Features

- **Toggle Screen Reader**: Activate or deactivate the screen reader with a single button.
- **Content Reading**: Reads text content, elements with `aria-label`, `title`, `alt`, `placeholder`, and `value`.
- **Text Selection**: Reads selected text by the user.
- **Element Highlighting**: Temporarily highlights elements being read for better visual feedback.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/screen-reader.git
   cd screen-reader
   ```

2. **Open the Project**:
   - Open the `index.html` file in your browser to start using the screen reader.

3. **API Key**:
   - Replace the `API_KEYS` placeholder in the `ScreenReader.js` file with your actual API key from a text-to-speech service (e.g., FarsiReader API).

## Usage

1. **Activate the Screen Reader**:
   - Click the "Activate Screen Reader" button to enable the screen reader.

2. **Interact with Elements**:
   - Click on any element to hear its content.
   - Select text on the page to have it read aloud.
   - Focus on input fields or buttons to hear their labels or placeholders.

3. **Deactivate the Screen Reader**:
   - Click the "Deactivate Screen Reader" button to turn off the screen reader.

## Code Structure

- **`ScreenReader.js`**: Contains the main logic for the screen reader.
- **`index.html`**: Sample HTML file with elements for testing.
- **`styles.css`**: Basic styling for the demo.

## Example HTML

```html
<button id="startRead">Activate Screen Reader</button>

<div id="textContent">
  This is a sample text.
</div>

<button aria-label="Sample button with aria-label">Button 1</button>

<img src="image.png" title="Sample image with title">

<input type="text" placeholder="Sample placeholder">

<input type="text" value="Sample value">
<button value="Sample button value">Button 2</button>

<div class="icon-sample">Icon</div>

<p>This is a paragraph. You can select this text.</p>
```

## API Integration

This project uses the [FarsiReader API](http://api.farsireader.com/) for text-to-speech functionality. Replace the `API_KEYS` variable in the `ScreenReader.js` file with your API key.

```javascript
generateAPIKey() {
  return ['YourAPIKeyHere'].join("");
}
```

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
