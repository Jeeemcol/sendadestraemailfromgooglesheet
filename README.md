# Google Sheet change trigger delivery of email with Adestra Mail Platform

This project allows you to automate the process of adding people to a Google Sheet when they submit a Google Form. Additionally, it provides the functionality to manually add people to the Google Sheet. Once added, the information is then sent to an Adestra list, enabling you to manage automated programs for your contacts.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Automated Google Form Submission](#automated-google-form-submission)
  - [Manual Entry to Google Sheet](#manual-entry-to-google-sheet)
- [Adestra Integration](#adestra-integration)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before using this project, make sure you have the following:

- A Google Form for collecting data from users.
- A Google Sheet to store the collected data.
- Adestra account for managing automated programs.

## Installation

1. Clone or download this repository to your local machine.

```bash
git clone https://github.com/Jeeemcol/sendadestraemailfromgooglesheet.git
```

2. Set up Google Form to Google Sheet integration. This is usually done in the Google Form itself. You can use Google Apps Script or other automation tools to accomplish this if you wish. Ensure that form submissions are recorded in your Google Sheet. **IMPORTANT: Assumes your emails are safe, if not -- perform email hygiene and security check first.**

3. Customize the integration code to send data to Adestra. You may need to obtain API credentials and modify the code accordingly e.g. replacing table IDs.

4. Deploy the integration code so that it runs automatically whenever a form is submitted or data is manually added to the Google Sheet.

## Usage

### Automated Google Form Submission

When someone submits the Google Form, the data is automatically added to the Google Sheet. Ensure that the integration is set up and running.

### Manual Entry to Google Sheet

To manually add people to the Google Sheet:

1. Open the Google Sheet where data is collected.

2. Manually enter the required information in the appropriate columns.

3. Save the changes.

### Adestra Integration

The integrated code should send data to Adestra to manage automated programs. Ensure that the data mapping is correctly set up in the integration code.

## Contributing

If you want to contribute to this project, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bug fix:

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes and commit them.

4. Push your changes to your fork.

5. Create a pull request to the main repository.

Contributions and bug reports welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
