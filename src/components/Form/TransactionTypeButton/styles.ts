import styled, { css } from "styled-components/native";
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons';

interface ContainerProps {
    isActive: boolean;
    isOpacity: boolean;
    type: 'up' | 'down';
}

interface ButtonProps {
    isOpacity: boolean;
}

interface IconProps {
    type: 'up' | 'down';
    isOpacity: boolean;
}

export const Container = styled.View<ContainerProps>`
    width: 48%;
    border: 1.5px solid ${({ theme }) => theme.colors.transaction_type_border_opacity};
    border-radius: 5px;

    ${({ isActive, isOpacity }) => (isActive || isOpacity) && css`
        border-color: transparent;
    `};

    ${({ isActive, type }) => isActive && type === 'up' && css`
        background-color: ${({ theme }) => theme.colors.success_light};
    `};

    ${({ isActive, type }) => isActive && type === 'down' && css`
        background-color: ${({ theme }) => theme.colors.attention_light};
    `};
`;

export const Button = styled(RectButton)<ButtonProps>`
    padding: 16px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    opacity: ${({ isOpacity }) => isOpacity ? 0.6 : 1.0};
`;

export const Icon = styled(Feather) <IconProps>`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;
    color: ${({ theme, type }) => type === 'up'
        ? theme.colors.success
        : theme.colors.attention
    };
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.title};
`;