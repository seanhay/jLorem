# jLorem README

## Features

This extension adds a menu item to add a customisable number of lines of Japanese Lorem Ipsum text (ダミーテキスト).
Paragraph length and number can be customised, and wrapping with <p> tags is optional.

## Extension Settings

This extension contributes the following settings:

* `jLorem.paragraph.min`: Set minimum sentence length
* `jLorem.paragraph.max`: Set maximum sentence length
* `jLorem.numberOfParagraphs`: Set the number of paragraphs
* `jLorem.pWrap`: Wrap each paragraph in a p tag

## Known Issues

Need to find some issues...

## Release Notes

Still in early test. But seems to work.

### 0.2.0

Replace web scraper with own local text file parser.
Read from local text (夏目漱石 - 吾輩は猫である) file instead of scraping from web source.

TODO:

- Improve parsing
- Add more text sources (and make sure they're clean)

### 0.1.0

Still a test release... but functional.
Scrapes from [日本語 Lorem ipsum (sugutsukaeru.jp)](https://lipsum.sugutsukaeru.jp/).