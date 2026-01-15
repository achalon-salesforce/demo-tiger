# DemoTiger

DemoTiger is a Salesforce package that enables rapid, modular demo builds with conditional visibility and automated branding.

## Installation

### Pre-Installation Requirements

Before installing DemoTiger, enable these features in your org:

1. **Enable Einstein Generative AI**
   - Navigate to Setup → Einstein Setup
   - Turn on Einstein

2. **Enable Prompt Templates**
   - Navigate to Setup → Prompt Template Settings
   - Enable Prompt Templates

### Installation Steps

1. **Install the Package**
   - Add this to the end of your org URL:
     ```
     /packaging/installPackage.apexp?p0=04tHu000004lH7k
     ```
   - Or use the full URL (replace `{your-org-domain}`):
     ```
     https://{your-org-domain}.lightning.force.com/packaging/installPackage.apexp?p0=04tHu000004lH7k
     ```
   - Select **"Install for All Users"**
   - Click **Install**

2. **Assign Permission Set**
   - Go to Setup → Users → Permission Sets
   - Find **DemoTiger Admin**
   - Click **Manage Assignments** → **Add Assignments**
   - Select your user and click **Assign**

3. **Activate DemoTiger Theme**
   - Navigate to Setup → Themes and Branding
   - Find **DemoTiger Theme**
   - Click the dropdown arrow → **Activate**

4. **Open DemoTiger App**
   - Click the **App Launcher** (9 dots in top left)
   - Search for and open **DemoTiger**

5. **Create Default Demo Configuration**
   - On the DemoTiger home page, click **Demo Kickstarter**
   - Follow the flow to create your default configuration
   - **Important:** You can only create one default configuration per org. This serves as the fallback when other configurations are inactive.

### Post-Installation: Experience Cloud Setup (Optional)

If you want to use DemoTiger with Experience Cloud sites:

#### For Each Experience Cloud Site:

1. **Add the Override Component**
   - Go to Setup → Digital Experiences → All Sites
   - Click **Builder** next to your site
   - Drag the **Override Site Demo** Aura component onto the page
   - Set **Enable Component** to `True`
   - Optionally, set **Text to Replace** (replaces that text with your Demo Configuration Name)

2. **Add Head Markup**
   - In Experience Builder, go to Settings → Advanced → Edit Head Markup
   - Paste this code at the **top** of the markup:
     ```html
     <script src="/sfsites/c/resource/xDO_DemoTiger" type="text/javascript"></script>
     ```
   - Click **Publish**

3. **Grant Guest User Access**
   - Go to Setup → Sites → [Your Site] → **Public Access Settings**
   - Under **Enabled Apex Class Access**, click Edit
   - Add: `XDO_OverrideSiteDemoController`
   - Save

## Cursor Integration (Recommended)

DemoTiger becomes even more powerful when paired with Cursor AI commands and rules. These provide intelligent automation and best practices enforcement for demo builds.

### Available Commands

#### `/install-demotiger`
Guides you through the complete DemoTiger installation process:
- Automates permission set assignment
- Opens the DemoTiger app
- Walks through Experience Cloud setup
- Verifies installation

📥 **Download:** [install-demotiger.md](https://salesforce.enterprise.slack.com/files/U06849QE955/F0A8KB1QBU7/install-demotiger.md)

#### `/demo-build`
Initiates a modular demo build session:
- Queries active demo configuration
- Generates 3-letter prefix automatically
- Creates demo-specific package.xml
- Enforces naming conventions
- Ensures conditional visibility on all components
- Adds demo checks to Apex classes and Flows
- Auto-generates demo script and story on completion

📥 **Download:** [demo-build.md](https://salesforce.enterprise.slack.com/files/U06849QE955/F0A9DMXAYRF/demo-build.md)

### Key Features

**Automated Workflows:**
- Permission set management (retrieves and updates existing sets)
- Package.xml generation (creates demo-specific packages)
- Component organization (groups related components logically)

**Best Practices Enforcement:**
- Field creation checklist (layout + FlexiPage + conditional visibility)
- Demo checks in Apex (prevents execution when wrong demo is active)
- Demo checks in Flows (validates active demo before running)
- Conditional visibility rules (components only show for correct customer)

**Documentation Generation:**
- Auto-generates demo scripts with value-focused chapters
- Creates structured README files for each demo
- Formats chapters as "Action Title — so that you can {value statement}"

### Setup

These commands are stored as user-level commands in Cursor, making them available across all Salesforce projects:

- **Commands:** `~/.cursor/commands/install-demotiger.md` and `~/.cursor/commands/demo-build.md`
- **Rules:** Configured in Cursor Settings → Rules (user-level)

Once set up, simply type `/install-demotiger` or `/demo-build` in any Cursor chat to get started!

## Documentation

For complete documentation and setup instructions, please refer to the [Slack Canvas](https://salesforce.enterprise.slack.com/docs/T01G0063H29/F08VCFQDL91).
