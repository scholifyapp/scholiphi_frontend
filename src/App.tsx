import { useUserStore } from './store/useUserStore';

function App() {
  const { name, setName } = useUserStore();
  return (
    <div className="p-6">
      <p>Hello, {name || 'Anonymous'}!</p>
      <button
        className="bg-green-500 text-white p-2 rounded"
        onClick={() => setName('Adarsh')}
      >
        Set Name
      </button>
    </div>
  );
}

export default App;
