import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../../hooks/auth';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const userTest = {
    id: 'any_id',
    email: 'john.doe@email.com',
    given_name: 'John Doe',
    picture: 'any_photo.png'
};

jest.mock('expo-auth-session', () => {
    return {
        startAsync: () => ({
            type: 'success',
            params: {
                access_token: 'any_token',
            }
        }),
    }
})

describe('Auth Hook', () => {
    it('should be able to sign in with Google account', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(userTest));

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        await act(() => result.current.signInWithGoogle());

        expect(result.current.user.id).toBe(userTest.id);
        expect(result.current.user.name).toBe(userTest.given_name);
        expect(result.current.user.email).toBe(userTest.email);
        expect(result.current.user.photo).toBe(userTest.picture);
    });
});