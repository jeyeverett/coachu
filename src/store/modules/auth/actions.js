export default {
  async authenticate(context, payload) {
    const {
      user: { email, password },
      id: mode
    } = payload;
    let URL = mode === 'signin' ? 'signInWithPassword' : 'signUp';

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:${URL}?key=AIzaSyBe-zJavtAE1fxWUjnzMb6umRkrbKjtCuA`,
      {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      let errorMessage = '';
      if (data.error && data.error.message) {
        switch (data.error.message) {
          case 'EMAIL_NOT_FOUND':
            errorMessage =
              'Email address not found - please sign up to create an account.';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'Invalid username or password.';
            break;
          case 'EMAIL_EXISTS':
            errorMessage = 'This email has already been registered.';
            break;
          case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMessage =
              'Too many attempts - service temporarily disabled - please try again later.';
            break;
          default:
            break;
        }
      }
      const error = new Error(
        errorMessage || 'Network error - failed to sign user in.'
      );
      throw error;
    }

    const authData = {
      token: data.idToken,
      userId: data.localId,
      tokenExpiry: data.expiresIn
    };

    context.commit('setCurrentUser', authData);
  }
};
