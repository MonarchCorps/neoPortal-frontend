import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { ExamQuestionProvider } from './context/ExamQuestionProvider'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: 1000 * 60 * 60 * 24,
		},
	},
});

const persister = createSyncStoragePersister({
	storage: window.localStorage,
});

persistQueryClient({
	queryClient,
	persister,
	maxAge: 1000 * 60 * 60 * 24,
});

// Register the service worker
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/service-worker.js')
			.then((registration) => {
				console.log('Service Worker registered with scope:', registration.scope);
			})
			.catch((error) => {
				console.error('Service Worker registration failed:', error);
			});
	});
}

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<QueryClientProvider client={queryClient}>
					<ExamQuestionProvider>
						<Routes>
							<Route path='/*' element={<App />} />
						</Routes>
					</ExamQuestionProvider>
				</QueryClientProvider>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>
);
