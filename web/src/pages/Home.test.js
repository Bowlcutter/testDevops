import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

describe('Home Page', () => {
    test('renders welcome heading', () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
        
        const heading = screen.getByText(/Welcome to the Art Store/i);
        expect(heading).toBeInTheDocument();
    });

    test('renders subtitle text', () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
        
        const subtitle = screen.getByText(/Discover unique works/i);
        expect(subtitle).toBeInTheDocument();
    });

    test('renders browse collection button', () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
        
        const button = screen.getByText(/Browse the Collection/i);
        expect(button).toBeInTheDocument();
    });

    test('button links to store page', () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
        
        const button = screen.getByText(/Browse the Collection/i);
        expect(button.closest('a')).toHaveAttribute('href', '/store');
    });
});
