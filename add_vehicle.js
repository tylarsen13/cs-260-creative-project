let m = {};

(async () => {
   const response = await fetch("https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?count=1&limit=10000", {
      headers: {
         "X-Parse-Application-Id": "51TnogcHffTvMpqZ2VPLBsRjGqSXX2LTBO0uuON3",
         "X-Parse-REST-API-Key": "s4fyPdrqkdbNBis4tUgOwzj3V1aYCiy5IdOMEsQU",
      },
   });
   const data = await response.json();
   const vehicleTypes = _.groupBy(data.results, "Make");
   const makes = Object.keys(vehicleTypes).sort();
   const vehicleMake = document.getElementById("vehicleMake");
   let makesHtml = "<option></option>";
   makes.forEach((make) => (makesHtml += `<option value="${make}">${make}</option>`));
   vehicleMake.innerHTML = makesHtml;
   Object.keys(vehicleTypes).forEach((key) => {
      m[key] = _.uniqBy(vehicleTypes[key], (car) => car.Model);
   });
})();

document.getElementById("vehicleMake").addEventListener("change", (event) => {
   if (Object.keys(m).includes(event.target.value)) {
      const vehicleModel = document.getElementById("vehicleModel");
      let modelsHtml = "<option></option>";
      m[event.target.value].forEach((car) => (modelsHtml += `<option value="${car.Model}">${car.Model}</option>`));
      vehicleModel.innerHTML = modelsHtml;
      document.getElementById("vehicleType").innerHTML = "";
   }
});

document.getElementById("vehicleModel").addEventListener("change", (event) => {
   const vehicleMake = document.getElementById("vehicleMake").value;
   const car = m[vehicleMake].find((car) => car.Model === event.target.value);
   document.getElementById("vehicleType").innerHTML = car.Category;
});
