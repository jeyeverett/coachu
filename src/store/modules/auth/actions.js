let autoSignOutTimer;

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
    const tokenExpiry = data.expiresIn * 1000;

    localStorage.setItem('userId', data.localId);
    localStorage.setItem('token', data.idToken);
    localStorage.setItem('tokenExpiry', tokenExpiry);

    autoSignOutTimer = setTimeout(() => {
      context.dispatch('autoSignOut');
      console.log(' expired');
    }, tokenExpiry);

    const authData = {
      token: data.idToken,
      userId: data.localId
    };

    context.commit('setCurrentUser', authData);
  },
  autoLogin(context) {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');

    const newTokenExpiry = Number(tokenExpiry) - 3600;

    if (newTokenExpiry < 0) {
      return;
    }

    if (token && userId) {
      autoSignOutTimer = setTimeout(
        () => context.dispatch('autoSignOut'),
        newTokenExpiry
      );
      context.commit('setCurrentUser', { userId, token });
    }
  },
  signOut(context) {
    clearTimeout(autoSignOutTimer);

    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');

    context.commit('setCurrentUser', {
      token: null,
      userId: null
    });
  },
  autoSignOut(context) {
    context.dispatch('signOut');
    context.commit('setAutoSignOut');
  }
};
