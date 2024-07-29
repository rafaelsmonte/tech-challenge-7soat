// test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

// Define the options for the test
export let options = {
  stages: [
    { duration: '1m', target: 1000 }, // ramp up to 10 users over 2 minutes
    { duration: '5m', target: 5000 }, // stay at 10 users for 5 minutes
    { duration: '2m', target: 0 },  // ramp down to 0 users over 2 minutes
  ],
};

// Define the main test function
export default function () {
  let response = http.get('http://a2958cdc71dc44e42935803a91625bf4-1882915345.us-east-1.elb.amazonaws.com/customer'); // Replace with your URL
  check(response, {
    'is status 200': (r) => r.status === 200,
  });
  sleep(1); // Sleep for 1 second between requests
}
