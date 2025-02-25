export const fetchCountryName = async (code: string): Promise<string> => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${code}`
    );
    if (!response.ok) throw new Error("Failed to fetch country data");

    const data = await response.json();
    return data[0]?.name?.common || "Unknown Country";
  } catch (error) {
    console.error("Error fetching country name:", error);
    return "Unknown Country";
  }
};
