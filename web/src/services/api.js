// API Base Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Generic fetch wrapper with error handling
const fetchAPI = async (url, options = {}) => {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Handle 204 No Content responses
        if (response.status === 204) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Painter API
export const painterAPI = {
    getAll: () => fetchAPI(`${API_BASE_URL}/painters`),
    
    getById: (id) => fetchAPI(`${API_BASE_URL}/painters/${id}`),
    
    getByName: (name) => fetchAPI(`${API_BASE_URL}/painters/name/${encodeURIComponent(name)}`),
    
    create: (painter) => fetchAPI(`${API_BASE_URL}/painters`, {
        method: 'POST',
        body: JSON.stringify(painter),
    }),
    
    update: (id, painter) => fetchAPI(`${API_BASE_URL}/painters/${id}`, {
        method: 'PUT',
        body: JSON.stringify(painter),
    }),
    
    delete: (id) => fetchAPI(`${API_BASE_URL}/painters/${id}`, {
        method: 'DELETE',
    }),
};

// User API
export const userAPI = {
    getAll: () => fetchAPI(`${API_BASE_URL}/users`),
    
    getById: (id) => fetchAPI(`${API_BASE_URL}/users/${id}`),
    
    getByEmail: (email) => fetchAPI(`${API_BASE_URL}/users/email/${encodeURIComponent(email)}`),
    
    create: (user) => fetchAPI(`${API_BASE_URL}/users`, {
        method: 'POST',
        body: JSON.stringify(user),
    }),
    
    update: (id, user) => fetchAPI(`${API_BASE_URL}/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
    }),
    
    delete: (id) => fetchAPI(`${API_BASE_URL}/users/${id}`, {
        method: 'DELETE',
    }),
    
    health: () => fetch(`${API_BASE_URL}/users/health`).then(r => r.text()),
};

// Test connection helper
export const testConnection = async () => {
    try {
        const health = await userAPI.health();
        console.log('✅ Backend connection successful:', health);
        return true;
    } catch (error) {
        console.error('❌ Backend connection failed:', error);
        return false;
    }
};
