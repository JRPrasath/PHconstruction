const { resetImpactData } = require('./data/impactData');

async function reset() {
  try {
    await resetImpactData();
    console.log('Impact data reset successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error resetting impact data:', error);
    process.exit(1);
  }
}

reset(); 