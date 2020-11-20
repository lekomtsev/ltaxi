export function configureFakeBackend() {
  const users = [
    { id:1, username: 'test@gmail.com', password: 'test', firstName: 'Test', lastName: 'User' },
  ]

  const realFetch = window.fetch

  window.fetch = function (url, options) {
    return new Promise((resolve, reject) => {

      // Simulate server request
      setTimeout(() => {

        // authenticate
        if (url.endsWith('/users/authenticate') && options.method === 'POST' ) {
          const params = JSON.parse(options.body)

          const filteredUsers = users.filter(user => {
            return user.username = params.username && user.password === params.password
          })

          if (filteredUsers.length) {
            const user = filteredUsers[0]
            const responseJson = {
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              token: 'fake-jwt-token',
            }

            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) })
          } else {
            reject('Логин или Пароль не верный!')
          }

          return
        }

        // get user
        if (url.endsWith('/users') && options.method === 'GET') {
          if (options.headers && options.header.Authorization === 'Bearer fake-jwt-token') {
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users)) })
          } else {
            reject('Unauthorised')
          }
        }

        realFetch(url, options).then(response => resolve(response))

      }, 1500)
    })
  }
}
