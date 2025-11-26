import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

jest.mock('./storages/CartStore', () => ({
    cartStore: {
        itemCount: 0
    }
}));

describe('App Component', () => {
    test('renders navigation bar', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
        
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Painters')).toBeInTheDocument();
        expect(screen.getByText('Store')).toBeInTheDocument();
    });

    test('renders shopping cart icon', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
        
        // the ShoppingCartIcon should be present
        const cartIcon = screen.getByRole('button');
        expect(cartIcon).toBeInTheDocument();
    });

    test('navigation links have correct hrefs', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
        
        const homeLink = screen.getByText('Home').closest('a');
        const paintersLink = screen.getByText('Painters').closest('a');
        const storeLink = screen.getByText('Store').closest('a');
        
        expect(homeLink).toHaveAttribute('href', '/');
        expect(paintersLink).toHaveAttribute('href', '/painters');
        expect(storeLink).toHaveAttribute('href', '/store');
    });
});
