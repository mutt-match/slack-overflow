SE.init({
  clientId: 10225,
  key: 'TnZJT9Pb9x45Tqy3pp97qw((',
  channelUrl: 'http://localhost:3456/blank',
  complete: (data) => data
});


//do we need this? -N
SE.authenticate({
  success: (data) => console.log('SE authenticate success', data),
  error: (error) => console.log('SE authenticate error', error),
  scope: ['read_inbox'],
  networkUsers: true
});
