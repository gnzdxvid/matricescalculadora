import React, { useState, useEffect } from 'react';
import { Shuffle, Plus, Minus, X, RotateCcw, LogOut, Moon, Sun, Smartphone, QrCode } from 'lucide-react';
import QRCode from 'qrcode';
import './index.css';

type Matrix = number[][];

interface OperationStep {
  description: string;
  formula?: string;
  result?: number;
}

const MatrixCalculator: React.FC = () => {
  const [matrixA, setMatrixA] = useState<Matrix>(Array(3).fill(null).map(() => Array(3).fill(0)));
  const [matrixB, setMatrixB] = useState<Matrix>(Array(3).fill(null).map(() => Array(3).fill(0)));
  const [resultMatrix, setResultMatrix] = useState<Matrix | null>(null);
  const [operationSteps, setOperationSteps] = useState<OperationStep[]>([]);
  const [currentOperation, setCurrentOperation] = useState<string>('');
  const [showProcess, setShowProcess] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  // Cargar preferencia de tema desde localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // Guardar preferencia de tema y aplicar clase al body
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Generar código QR
  const generateQRCode = async () => {
    try {
      // Obtener la URL actual
      const currentUrl = window.location.href;
      const qrDataUrl = await QRCode.toDataURL(currentUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: darkMode ? '#ffffff' : '#000000',
          light: darkMode ? '#000000' : '#ffffff'
        }
      });
      setQrCodeUrl(qrDataUrl);
      setShowQRCode(true);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const fillMatrixRandom = (matrix: Matrix): Matrix => {
    return matrix.map(row => 
      row.map(() => Math.floor(Math.random() * 10))
    );
  };

  const handleFillBothMatrices = () => {
    const newMatrixA = fillMatrixRandom(matrixA);
    const newMatrixB = fillMatrixRandom(matrixB);
    setMatrixA(newMatrixA);
    setMatrixB(newMatrixB);
    setResultMatrix(null);
    setOperationSteps([]);
  };

  const addMatrices = () => {
    const steps: OperationStep[] = [];
    steps.push({
      description: 'Suma de Matrices',
      formula: 'C[i][j] = A[i][j] + B[i][j]'
    });

    const result: Matrix = matrixA.map((row, i) => {
      return row.map((val, j) => {
        const sum = val + matrixB[i][j];
        steps.push({
          description: `Posición C${i+1}${j+1}`,
          formula: `${val} + ${matrixB[i][j]} = ${sum}`,
          result: sum
        });
        return sum;
      });
    });

    setResultMatrix(result);
    setOperationSteps(steps);
    setCurrentOperation('suma');
    setShowProcess(true);
  };

  const subtractMatrices = () => {
    const steps: OperationStep[] = [];
    steps.push({
      description: 'Resta de Matrices',
      formula: 'C[i][j] = A[i][j] - B[i][j]'
    });

    const result: Matrix = matrixA.map((row, i) => {
      return row.map((val, j) => {
        const diff = val - matrixB[i][j];
        steps.push({
          description: `Posición C${i+1}${j+1}`,
          formula: `${val} - ${matrixB[i][j]} = ${diff}`,
          result: diff
        });
        return diff;
      });
    });

    setResultMatrix(result);
    setOperationSteps(steps);
    setCurrentOperation('resta');
    setShowProcess(true);
  };

  const multiplyMatrices = () => {
    const steps: OperationStep[] = [];
    steps.push({
      description: 'Multiplicación de Matrices',
      formula: 'C[i][j] = Σ(A[i][k] × B[k][j])'
    });

    const result: Matrix = Array(3).fill(null).map(() => Array(3).fill(0));

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let sum = 0;
        let formula = '';
        
        for (let k = 0; k < 3; k++) {
          const product = matrixA[i][k] * matrixB[k][j];
          sum += product;
          formula += k === 0 ? `${matrixA[i][k]}×${matrixB[k][j]}` : ` + ${matrixA[i][k]}×${matrixB[k][j]}`;
        }
        
        steps.push({
          description: `Posición C${i+1}${j+1}`,
          formula: `${formula} = ${sum}`,
          result: sum
        });
        
        result[i][j] = sum;
      }
    }

    setResultMatrix(result);
    setOperationSteps(steps);
    setCurrentOperation('multiplicación');
    setShowProcess(true);
  };

  const renderMatrix = (matrix: Matrix, title: string, bgColor: string = 'bg-white') => (
    <div className={`${bgColor} dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100 dark:border-gray-700`}>
      <h3 className="text-base sm:text-xl font-semibold text-center mb-2 sm:mb-4 text-gray-800 dark:text-gray-100 transition-colors duration-300">{title}</h3>
      <div className="grid grid-cols-3 gap-1 sm:gap-2 max-w-xs sm:max-w-sm mx-auto">
        {matrix.map((row, i) =>
          row.map((val, j) => (
            <div
              key={`${i}-${j}`}
              className={`matrix-cell ${bgColor === 'bg-white' ? 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600' : 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 text-blue-800 dark:text-blue-100 border border-blue-300 dark:border-blue-700'}`}
            >
              {val}
            </div>
          ))
        )}
      </div>
    </div>
  );

  const resetCalculator = () => {
    setMatrixA(Array(3).fill(null).map(() => Array(3).fill(0)));
    setMatrixB(Array(3).fill(null).map(() => Array(3).fill(0)));
    setResultMatrix(null);
    setOperationSteps([]);
    setCurrentOperation('');
    setShowProcess(false);
  };

  return (
    <div className={`min-h-screen py-4 px-2 sm:py-8 sm:px-4 relative transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Header con información del estudiante y toggle de tema */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 text-left">
        <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Angel David Arriaga Gonzalez</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">Álgebra Lineal</p>
      </div>
      
      {/* Botones de control */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex gap-2">
        {/* Botón vista móvil */}
        <button
          onClick={generateQRCode}
          className="p-2 sm:p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700"
          aria-label="Generar código QR"
          title="Escanear con móvil"
        >
          <Smartphone size={16} className="text-gray-700 dark:text-gray-300" />
        </button>
        
        {/* Toggle de modo oscuro */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 sm:p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun size={16} className="text-yellow-500" />
          ) : (
            <Moon size={16} className="text-gray-700" />
          )}
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-6 sm:mb-10 animate-fade-in">
          <h1 className="text-2xl sm:text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-2 sm:mb-3 transition-colors duration-300">
            Calculadora de Matrices
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400 transition-colors duration-300">Operaciones con matrices 3×3</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 mb-8">
          {renderMatrix(matrixA, 'Matriz A', 'bg-white')}
          {renderMatrix(matrixB, 'Matriz B', 'bg-white')}
          {resultMatrix && renderMatrix(resultMatrix, 'Matriz Resultado', 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900')}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-8 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 sm:mb-6 text-gray-800 dark:text-gray-100 transition-colors duration-300">Operaciones</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
            <button
              onClick={handleFillBothMatrices}
              className="bg-gradient-to-r from-slate-100 to-gray-100 dark:from-gray-700 dark:to-gray-600 hover:from-slate-200 hover:to-gray-200 dark:hover:from-gray-600 dark:hover:to-gray-500 text-gray-700 dark:text-gray-200 px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base"
            >
              <Shuffle size={14} className="sm:hidden" />
              <Shuffle size={18} className="hidden sm:block" />
              <span className="hidden sm:inline">Llenar Matrices</span>
              <span className="sm:hidden">Llenar</span>
            </button>
            <button
              onClick={addMatrices}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base"
              disabled={!matrixA.some(row => row.some(val => val !== 0)) || !matrixB.some(row => row.some(val => val !== 0))}
            >
              <Plus size={14} className="sm:hidden" />
              <Plus size={18} className="hidden sm:block" />
              <span className="hidden sm:inline">Sumar</span>
              <span className="sm:hidden">+</span>
            </button>
            <button
              onClick={subtractMatrices}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base"
              disabled={!matrixA.some(row => row.some(val => val !== 0)) || !matrixB.some(row => row.some(val => val !== 0))}
            >
              <Minus size={14} className="sm:hidden" />
              <Minus size={18} className="hidden sm:block" />
              <span className="hidden sm:inline">Restar</span>
              <span className="sm:hidden">-</span>
            </button>
            <button
              onClick={multiplyMatrices}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base"
              disabled={!matrixA.some(row => row.some(val => val !== 0)) || !matrixB.some(row => row.some(val => val !== 0))}
            >
              <X size={14} className="sm:hidden" />
              <X size={18} className="hidden sm:block" />
              <span className="hidden sm:inline">Multiplicar</span>
              <span className="sm:hidden">×</span>
            </button>
            <button
              onClick={resetCalculator}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base"
            >
              <RotateCcw size={14} className="sm:hidden" />
              <RotateCcw size={18} className="hidden sm:block" />
              <span className="hidden sm:inline">Reiniciar</span>
              <span className="sm:hidden">↻</span>
            </button>
            <button
              onClick={() => window.close()}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base"
            >
              <LogOut size={14} className="sm:hidden" />
              <LogOut size={18} className="hidden sm:block" />
              <span className="hidden sm:inline">Salir</span>
              <span className="sm:hidden">✕</span>
            </button>
          </div>
        </div>

        {showProcess && operationSteps.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 animate-slide-up border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">
                Proceso de {currentOperation}
              </h2>
              <button
                onClick={() => setShowProcess(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl sm:text-2xl font-light transition-colors duration-200"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-2 sm:space-y-3 max-h-64 sm:max-h-96 overflow-y-auto">
              {operationSteps.map((step, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-700 dark:to-gray-600 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-200">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1 sm:mb-2 text-sm sm:text-base transition-colors duration-300">
                        {step.description}
                      </h4>
                      {step.formula && (
                        <p className="text-sm sm:text-base font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900 px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-blue-200 dark:border-blue-700 transition-colors duration-300">
                          {step.formula}
                        </p>
                      )}
                    </div>
                    {step.result !== undefined && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 text-green-700 dark:text-green-300 px-3 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base ml-0 sm:ml-4 border border-green-200 dark:border-green-700 transition-colors duration-300">
                        = {step.result}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal de Código QR */}
        {showQRCode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                  <QrCode size={20} />
                  Escanear con Móvil
                </h3>
                <button
                  onClick={() => setShowQRCode(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl font-light transition-colors duration-200"
                >
                  ×
                </button>
              </div>
              
              <div className="text-center">
                <img 
                  src={qrCodeUrl} 
                  alt="Código QR para acceder a la calculadora" 
                  className="mx-auto mb-4 rounded-lg border border-gray-200 dark:border-gray-700"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Escanea este código QR con tu teléfono para acceder a la calculadora de matrices
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {window.location.href}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatrixCalculator;
