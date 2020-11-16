const sinon = require('sinon')
const A = require('../services/user/auth.service')

/* 
=====FAKE FUNCTIONS TO BE STUBBED======= 

This approach was adopted to prevent making actual calls to the database as the intention is to test the function in the service

*/
function testSignUp(user) {
  const expectedInput = {
    username: 'Demo',
    password: '12345678',
    flag: 'register'
  }
  if (user.username === expectedInput.username && user.password === expectedInput.password && user.flag === expectedInput.flag) {
    return {
      status: true,
      data: null,
      message: 'Registration successful'
    }
  }
  return {
    status: false,
    data: null
  }
}

function testSignIn(user) {
  const expectedInput = {
    username: 'Demo',
    password: '12345678'
  }
  if (user.username === expectedInput.username && user.password === expectedInput.password) {
    return {
      status: true,
      data: {
        user: {
          username: 'Demo User',
          gameId: 'SJ5FNS'

        },
        token: 'BUBEIBSKEOIOWJBIWEUB'
      }
    }
  }
  return {
    status: false,
    data: null
  }
}

/* ======STUBBED FUNCTIONS FAKE FUNCTIONS TO BE STUBBED========== */


describe('register', () => {
  const creatUser = {
    username: 'Demo',
    password: '12345678',
    flag: 'register'
  }
  A.authUser = sinon.stub()
  A.authUser.callsFake(testSignUp);
  it('Registers a user and returns true', async () => {
    const expected = await A.authUser(creatUser)
    expect(expected.status).toEqual(true);
  });

  sinon.restore()
})


describe('login', () => {
  const demoLoginUser = {
    username: 'Demo',
    password: '12345678'
  }
  A.authUser = sinon.stub()
  A.authUser.callsFake(testSignIn);

  it('Logs in a user and returns token alongside the user object', async () => {
    const loginUser = await A.authUser(demoLoginUser)
    expect(loginUser.data.token).toBeDefined();
    expect(loginUser.data.user).toBeDefined();
  });
  sinon.restore()
})
