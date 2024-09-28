
export default function getParametersList(url){
    const fetchData = async() => {
        const response = await fetch(url);
        const data = await response.json(); 
        return data;
    }
    return fetchData();
}