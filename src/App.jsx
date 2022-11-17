import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const ErrorImage = 'src/assets/error404.jpg';

  // console.log(import.meta.env.VITE_OPENAI_API_KEY);
  const configuration = new Configuration({
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const generateImage = async () => {
    const response = await openai.createImage({
      // model: 'text-davinci-002',
      prompt: text,
      n: 1,
      size: '1024x1024',
    });
    setImage(response.data.data[0].url);
  };

  return (
    <div className="app-main flex justify-center items-center">
      <h1 className="font-bold mt-20">Generate Image using OpenAI API</h1>
      <input
        className="h-12 m-[20px] text-2xl md:text-lg w-[400px] p-2 rounded-xl bg-gray-400 placeholder:text-center placeholder:text-gray-700 shadow-stone-400 shadow-2xl text-black font-semibold border-2"
        placeholder="Enter text to generate image..."
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={generateImage}
        className="font-bold text-2xl hover:scale-110 duration-200 hover:bg-blue-600 hover:text-white"
      >
        Generate Image
      </button>
      {image.length > 0 ? (
        <img
          src={image}
          alt="open ai image"
          className="lg:w-[800px] lg:h-[800px] w-[450px] h-[450px] m-8 border-2 border-gray-400 rounded-xl"
        />
      ) : (
        <img
          src={ErrorImage}
          className="lg:w-[800px] lg:h-[800px] w-[450px] h-[450px] m-8 border-2 border-gray-400 rounded-xl"
          alt="404"
        />
      )}
    </div>
  );
}

export default App;
