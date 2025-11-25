import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import './App.css';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import useTechnologiesApi from './hooks/useTechnologiesApi';
import { AppProvider, useApp } from './contexts/AppContext';
import { lightTheme, darkTheme } from './styles/theme';
import { useThemeEffect } from './hooks/useThemeEffect';

function ThemeApplier() {
    useThemeEffect();
    return null;
}

function AppContent() {
    const {
        technologies,
        apiData,
        loading,
        error,
        updateStatus,
        updateNotes,
        addTechnology,
        deleteTechnology,
        progress,
        importFromApi,
        importRoadmap
    } = useTechnologiesApi();

    const handleImportTechnology = async (techData) => {
        try {
            await importFromApi(techData);
        } catch (err) {
            console.error('Ошибка импорта технологии:', err);
        }
    };

    const handleImportRoadmap = async (roadmapUrl) => {
        try {
            await importRoadmap(roadmapUrl);
        } catch (err) {
            console.error('Ошибка импорта дорожной карты:', err);
        }
    };

    if (loading && technologies.length === 0) {
        return (
            <div className="app-loading">
                <div className="spinner-large"></div>
                <p>Загрузка технологий...</p>
            </div>
        );
    }

    return (
        <>
            <ThemeApplier />
            <Router>
                <div className="App">
                    <Navigation />
                    <main className="App-main">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Home
                                        technologies={technologies || []}
                                        progress={progress}
                                        updateStatus={updateStatus}
                                        onImportTechnology={handleImportTechnology}
                                        onImportRoadmap={handleImportRoadmap}
                                        apiData={apiData}
                                        loading={loading}
                                        error={error}
                                    />
                                }
                            />
                            <Route
                                path="/technologies"
                                element={
                                    <TechnologyList
                                        technologies={technologies || []}
                                        updateStatus={updateStatus}
                                        onImportTechnology={handleImportTechnology}
                                        loading={loading}
                                        error={error}
                                    />
                                }
                            />
                            <Route
                                path="/technology/:techId"
                                element={
                                    <TechnologyDetail
                                        technologies={technologies || []}
                                        updateStatus={updateStatus}
                                        updateNotes={updateNotes}
                                        deleteTechnology={deleteTechnology}
                                    />
                                }
                            />
                            <Route
                                path="/add-technology"
                                element={
                                    <AddTechnology
                                        onAddTechnology={addTechnology}
                                    />
                                }
                            />
                            <Route
                                path="/statistics"
                                element={
                                    <Statistics
                                        technologies={technologies || []}
                                    />
                                }
                            />
                            <Route
                                path="/settings"
                                element={
                                    <Settings />
                                }
                            />
                        </Routes>
                    </main>
                </div>
            </Router>
        </>
    );
}

function App() {
    return (
        <AppProvider>
            <ThemeWrapper>
                <AppContent />
            </ThemeWrapper>
        </AppProvider>
    );
}

function ThemeWrapper({ children }) {
    const { themeMode } = useApp();

    return (
        <ThemeProvider theme={themeMode === 'dark' ? darkTheme : lightTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}

export default App;