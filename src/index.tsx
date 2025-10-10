import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ALHelper from './utils/ALHelper';

CreateRootWhenLoaded('controlAddIn');

async function CreateRootWhenLoaded(elementId: string): Promise<void> {
    const root = await waitForElementToExistId(elementId);
    CreateRoot(root as HTMLElement);

    // Example. Remove for Production
    exampleFunction();
}

// Example. Remove for Production
function exampleFunction(): void {
    // Makes the function available to be called in AL
    ALHelper.makeFunctionAccessible(someGlobalFunction);

    // Calls the AL event OnControlReady with the given data
    const datetime = new Date(Date.now());
    ALHelper.invokeEvent('OnControlReady', 'Control Ready Event. Time: ', datetime.toLocaleTimeString());
}

// Example. Remove for Production
function someGlobalFunction(): void {
    window.alert('Hello, from the Control Add-in!');
}

function waitForElementToExistId(elementId: string): Promise<HTMLElement> {
    return new Promise((resolve) => {
        function checkElement(): void {
            const element = document.getElementById(elementId);
            if (element == null) {
                setTimeout(checkElement, 50);
            } else {
                resolve(element);
            }
        }
        checkElement();
    });
}

function CreateRoot(element: HTMLElement): void {
    const root = ReactDOM.createRoot(element);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
