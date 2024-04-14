import './App.css'
import { Dashboard } from './components/Dashboard'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store/store'
import { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import TrackOrder from './components/TrackOrder';
import ContactUs from './components/ContactUs';
// import Checkout from './components/CartCheckout/Checkout';
const Checkout = lazy(() => import('./components/CartCheckout/Checkout'));

function App() {

  return (
    <>
     <Provider store={store}>
     <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Dashboard/>}/> 
          <Route path="/checkout" element={<Checkout/>}/> 
          <Route path="/trackOrder" element={<TrackOrder/>}/> 
          <Route path="/contactUs" element={<ContactUs/>}/> 
        </Routes>
      </BrowserRouter>
     </Suspense>
     <Toaster
        toastOptions={{
          success: {
            style: {
              background: '#C5EFCB',
            },
          },
          error: {
            style: {
              background: '#F9C8CB',
            },
          },
        }}
      />
     </Provider>
    </>
  )
}

export default App
