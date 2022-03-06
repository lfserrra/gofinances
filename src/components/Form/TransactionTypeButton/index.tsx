import React from "react";
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Icon, Title, Button } from "./styles";

const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
}

interface Props extends RectButtonProps {
    type: 'up' | 'down';
    title: string;
    isActive: boolean;
    isOpacity: boolean;
}

export function TransactionTypeButton({ type, title, isActive, isOpacity, ...rest }: Props) {
    return (
        <Container isActive={isActive} isOpacity={isOpacity} type={type}>
            <Button isOpacity={isOpacity} {...rest}>
                <Icon name={icons[type]} type={type} />
                <Title>{title}</Title>
            </Button>
        </Container>
    );
}