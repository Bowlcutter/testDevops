import React from 'react';
import { render, screen } from '@testing-library/react';
import PainterCard from './PainterCard';

describe('PainterCard Component', () => {
    test('renders painter name', () => {
        render(<PainterCard name="Vincent van Gogh" style="Post-Impressionism" />);
        
        const nameElement = screen.getByText('Vincent van Gogh');
        expect(nameElement).toBeInTheDocument();
    });

    test('renders painter style', () => {
        render(<PainterCard name="Pablo Picasso" style="Cubism" />);
        
        const styleElement = screen.getByText('Cubism');
        expect(styleElement).toBeInTheDocument();
    });

    test('displays both name and style together', () => {
        render(<PainterCard name="Claude Monet" style="Impressionism" />);
        
        expect(screen.getByText('Claude Monet')).toBeInTheDocument();
        expect(screen.getByText('Impressionism')).toBeInTheDocument();
    });
});
