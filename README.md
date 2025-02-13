# AMSI Bypass Generator - GitHub Page

## Project Description

This repository contains a web page hosted on GitHub Pages that provides detailed information about the **AMSI (Antimalware Scan Interface)** module and the various techniques used to **bypass it**. The page has a random code generator that allows you to evade the detection of Windows Defender and other security systems, preventing the generated code from matching predefined signatures.

## What is AMSI?

**AMSI (Antimalware Scan Interface)** is a scanning interface built into Windows that allows antivirus products to inspect running scripts and content for potential threats. AMSI is particularly effective at detecting obfuscated code in PowerShell, JavaScript, VBScript, and Office macros.

## Project Objective

This project aims to research and learn about offensive security and the methodologies used to evade AMSI. By using various techniques, code loads that do not match Windows Defender detection signatures are generated, allowing them to execute without being blocked.

⚠ **Legal Notice:** This project is intended exclusively for educational and research purposes in offensive security. It should not be used for malicious purposes or on unauthorized systems.

## Main Features

- **AMSI Bypass Generator:** Generates random code to bypass AMSI and avoid signature detections.
- **Variability in Payloads:** Thanks to the randomization of the code, it is more difficult for Windows Defender to identify it as a threat.
- **Different Bypass Techniques:** Implements methods such as:
    - Manipulation of AMSI.dll functions
    - Obfuscation of strings and payloads
    - AMSI memory modification
    - Loading assemblies at runtime
- **Intuitive interface:** Minimalist and attractive design with terminal aesthetics.

## Technologies Used

- **HTML, CSS and JavaScript:** For the structure and design of the website.
- **GitHub Pages:** To host and distribute the page in an accessible way.
- **Bootstrap & Tailwind CSS:** For stylization and responsiveness.
- **Codemirror.js:** For syntax highlighting in the code generator.

## Installation and Use

1. Clone the repository:
    
```bash
git clone https://github.com/d1se0/AMSI-Bypass-Generator.git
```
    
2. Open the `index.html` file in a browser.
3. Access the version on GitHub Pages:
    - [See Page](https://d1se0.github.io/AMSI-Bypass-Generator/index.html)
4. Generate bypass code and study the different techniques implemented.

## Contributions

Contributions are welcome. To add new bypass techniques or improve the design, follow these steps:

1. Make a **fork** of the repository.
2. Create a branch with the improvement:
    
```bash
git checkout -b feature/nueva-mejora
```
    
3. Make the changes and send a pull request.

## Contact

If you have questions or suggestions, you can contact me through:

- GitHub: [d1se0](https://github.com/D1se0)
- Gmail: [ciberseguridad12345@gmail.com](mailto:ciberseguridad12345@gmail.com)

---

### ⚠ Disclaimer / Exemption of Liability

This project is exclusively for educational purposes. I am not responsible for any improper use that may be given to it. Use this knowledge ethically and responsibly.

---
