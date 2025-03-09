// Vercel deployment script
const { execSync } = require('child_process');

console.log('Starting Vercel deployment...');

try {
  // Deploy to Vercel in non-interactive mode
  console.log('Deploying to Vercel...');
  execSync('vercel --confirm', { stdio: 'inherit' });
  
  console.log('\nDeployment successful!');
  console.log('Your application is now live on Vercel.');
  console.log('You can find the deployment URL in the output above.');
} catch (error) {
  console.error('Deployment failed:', error.message);
  process.exit(1);
} 