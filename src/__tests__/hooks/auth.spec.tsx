import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../../hooks/auth';
import { mocked } from "jest-mock"
import fetchMock from 'jest-fetch-mock';
import { startAsync } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

fetchMock.enableMocks();

const userTest = {
    id: 'any_id',
    email: 'john.doe@email.com',
    given_name: 'John Doe',
    picture: 'any_photo.png'
};

jest.mock('expo-auth-session');

describe('Auth Hook', () => {
    beforeEach(async () => {
        const userCollectionKey = '@gofinances:user'
        await AsyncStorage.removeItem(userCollectionKey)
    });

    it('should be able to sign in with Google account', async () => {
        const googleMocked = mocked(startAsync as any);
        googleMocked.mockReturnValueOnce({
            type: 'success',
            params: {
                access_token: 'any_token',
            }
        })

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

    it('user should not connect if cancel authentication with Google', async () => {
        const googleMocked = mocked(startAsync as any);
        googleMocked.mockReturnValueOnce({
            type: 'cancel'
        })

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        await act(() => result.current.signInWithGoogle());

        expect(result.current.user).not.toHaveProperty('id');
    });
});