import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Food.css';

const URL  = import.meta.env.VITE_PUBLIC_URL;
const Food = () => {
    const [nutritionData, setNutritionData] = useState([{
        breakfast: 'dvhkbas',
        lunch: 'csljcnsaj',
        dinner: 'csaljbchkas',
        breakfast_recipe: 'caskhvbchkasc',
        lunch_recipe: 'sljcjbashk bckh',
        dinner_recipe: 'ckhas bvhicvasyic',
        calories: 'khcvhasvciysaC',
        protein: 'SJCBHISAVC',
        fat: 'CKHBASHKCVSA',
        carbs: 'CASHCVYIASBCOI',
      }]); // State to hold nutrition data
      const [error, setError] = useState(''); // State to handle errors
      const [loading, setLoading] = useState(true); // State to handle loading
    
      useEffect(() => {
        // Fetches nutrition data from the backend when the component mounts
        const fetchNutritionData = async () => {
          try {
            const userId = localStorage.getItem('userId'); // Get the user ID from local storage
            // const response = await axios.get(`https://shred.onrender.com/api/users/${userId}/nutrition`);
            const response = await axios.get(`${URL}/api/users/${userId}/nutrition`);
            if(response.data.length > 0) {
              console.log('Data received:', response.data);
              setNutritionData(response.data);
            }
            setLoading(false); // Set loading to false after data is fetched
          } catch (err) {
            console.error('Error fetching data:', err);
            setError(err.response?.data?.error || 'Failed to fetch nutritional data');
            setLoading(false); // Set loading to false even if there's an error
          }
        };

        console.log("scbks", nutritionData);
    
        fetchNutritionData(); // Call the function to fetch data
      }, []); // Empty dependency array means this runs once on mount
    
      // Conditionally render different content based on the state
      if (loading) {
        return <div>Loading...</div>; // Show a loading state while data is being fetched
      }
    
      if (error) {
        return <div>Error: {error}</div>; // Show error message if there's an error
      }
    
  return (
    <>
        { !loading && 
        <div className='food-container'>
            <div className='food-main'>
                <div className='food-info'>
                    <div className='brkfst-info'>
                            <h4>Breakfast</h4>
                            <p>{nutritionData?.[0].breakfast}</p>
                            <p>{nutritionData?.[0].breakfast_recipe}</p>
                    </div>
                    <div className='lunch-info'>
                            <h4>Lunch</h4>
                            <p>{nutritionData?.[0].lunch}</p>
                            <p>{nutritionData?.[0].lunch_recipe}</p>
                    </div>
                    <div className='dinner-info'>
                            <h4>Dinner</h4>
                            <p>{nutritionData?.[0].dinner}</p>
                            <p>{nutritionData?.[0].dinner_recipe}</p>
                    </div>
                </div>
                <div className='macros-info'>
                    <div className='protien'>
                        <h4>Protien</h4>
                        <p>{nutritionData?.[0].protein}g</p>
                    </div>
                    <div className='calories'>
                        <h4>Calories</h4>
                        <p>{nutritionData?.[0].calories}kcal</p>
                    </div>
                    <div className='fat'>
                        <h4>Fat</h4>
                        <p>{nutritionData?.[0].fat}g</p>
                    </div>
                    <div className='carbs'>
                        <h4>Carbs</h4>
                        <p>{nutritionData?.[0].carbs}g</p>
                    </div>
                </div>
            </div>
        </div>}
    </>
  )
}

export default Food