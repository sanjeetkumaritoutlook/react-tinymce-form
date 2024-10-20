export function lipapiUrl() {
    // Local set-up
    if (window.location.origin.includes('localhost')) {
      return 'http://localhost:8080';
    }
  
    // Deployed configuration
    if (
      window.location.origin.includes('liberty-idea-portal-development') ||
      window.location.origin.includes('dxalyfi49eqkt.cloudfront.net')
    ) {
      // Dev
      return 'https://cq6t8i38k5.execute-api.us-east-1.amazonaws.com/development/api';
    } else if (
      window.location.origin.includes('liberty-idea-portal-test') ||
      window.location.origin.includes('d2ctn9g8vnhla2.cloudfront.net')
    ) {
      // Test
      return 'https://i6gn3yjw92.execute-api.us-east-1.amazonaws.com/test/api';
    } else {
      // Production
      return 'https://644no1mfy7.execute-api.us-east-1.amazonaws.com/production/api';
    }
  }
  