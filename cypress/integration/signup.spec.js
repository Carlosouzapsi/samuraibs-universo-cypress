import signup from '../support/pages/signup'
import signupPage from '../support/pages/signup'


describe('cadastro', function () {

  context('quando o usuário é novato', function () {

    const user = {
      name: 'Carlos Otávio de Souza',
      email: 'carlos.souza@samuraibs.com',
      password: 'pwd123'
    }

    before(function () {
      cy.task('removeUser', user.email)
        .then(function (result) {
          console.log(result)
        })

    })

    it('deve cadastrar com sucesso', function () {

      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      const msg = 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!'
      signupPage.toast.shouldHaveText(msg)

    })

  })

  context('quando o email já existe', function () {

    const user = {
      name: 'João Lucas',
      email: 'joao@samuraibs.com',
      password: 'pwd123',
      is_provider: true
    }

    before(function () {
      cy.task('removeUser', user.email)
        .then(function (result) {
          console.log(result)
        })

      cy.request(
        'POST',
        'http://localhost:3333/users',
        user
      ).then(function (response) {
        expect(response.status).to.eq(200)
      })
    })

    it('não deve cadastrar um email que já está cadastrado', function () {

      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      const msg = 'Email já cadastrado para outro usuário.'
      signupPage.toast.shouldHaveText(msg)

    })
  })

  context('quando o email é incorreto', function () {

    const user = {
      name: 'Elizabeth Olsen',
      email: 'liza.yahoo.com',
      password: 'pwd123'
    }

    it('deve exibir mensagem de alerta', function () {

      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      const msg = 'Informe um email válido'
      signupPage.alertHaveText(msg)
    })





  })

  context('quando a senha for muito curta', function () {

    const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']

    beforeEach(function () {
      signup.go()
    })

    passwords.forEach(function (p) {
      it('não deve cadastrar com a senha ' + p, function () {

        const user = {
          name: 'Jason Friday',
          email: 'json@gmail.com',
          password: p
        }

        signupPage.form(user)
        signupPage.submit()
      })

    })

    afterEach(function () {
      signup.alertHaveText('Pelo menos 6 caracteres')
    })

  })

  context.only('quando não preencho nenhum dos campos', function(){

    const alertMessages = [
      'Nome é obrigatório',
      'E-mail é obrigatório',
      'Senha é obrigatória'
    ]

    before(function(){
      signupPage.go()
      signupPage.submit()

    })

    alertMessages.forEach(function(alert){

      it('deve exibir ' + alert.toLowerCase(), function(){
        signupPage.alertHaveText(alert)
      })

    })

  })

})
  




