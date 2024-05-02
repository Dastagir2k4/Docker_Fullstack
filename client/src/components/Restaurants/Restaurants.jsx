import food from "./food.webp"

const Restaurants = () => {
  return (
    <div className="min-h-screen bg-red-500">
        <div className="pt-10 mr-16 ml-16">
            <div className="pt-8 px-2 mt-2">
            <h2 className="text-5xl text-white">Choose Category</h2>
            </div>
        <div className="flex  flex-col md:flex-row text-4xl justify-between px-4 mt-20">
                <div className="flex-col shadow-2xl p-2 rounded-xl bg-white text-stone-700">
                  <div className="flex rounded-lg">
                    <img src={food} style={{height:100,width:100}}/>
                  <p className="text-2xl px-8 py-5">Breakfast</p>
                  </div>
                </div>
                <div className="flex-col shadow-2xl p-2 rounded-xl bg-white text-stone-700">
                  <div className="flex rounded-lg">
                    <img src={food} style={{height:100,width:100}}/>
                  <p className="text-2xl px-8 py-5">Lunch</p>
                  </div>
                </div>
                <div className="flex-col shadow-2xl p-2 rounded-xl bg-white text-stone-700">
                  <div className="flex rounded-lg">
                    <img src={food} style={{height:100,width:100}}/>
                  <p className="text-2xl px-8 py-5">Dinner</p>
                  </div>
                </div>
                <div className="flex-col shadow-2xl p-2 rounded-xl bg-white text-stone-700">
                  <div className="flex rounded-lg">
                    <img src={food} style={{height:100,width:100}}/>
                  <p className="text-2xl px-8 py-5">Fast Food</p>
                  </div>
                  
                </div>
               </div>
               {/* <div className="mt-16 ">
               <h2 className="text-5xl text-white mb-16">Restaurants Near you</h2>
               <div className="container  flex flex-row mx-auto">
                <div className=" px-12">
                    <div className="bg-slate-500">
                    <img src={food} style={{height:360,width:390}}/>
                    <h2>Restaurants 1</h2>
                    </div>
                </div>
                <div className=" px-12">
                    <div className="bg-slate-500">
                    <img src={food} style={{height:360,width:390}}/>
                    <h2>Restaurants 1</h2>
                    </div>
                </div>
                <div className=" px-12">
                    <div className="bg-slate-500">
                    <img src={food} style={{height:360,width:390}}/>
                    <h2>Restaurants 1</h2>
                    </div>
                </div>
                <div className=" px-12">
                    <div className="bg-slate-500">
                    <img src={food} style={{height:360,width:390}}/>
                    <h2>Restaurants 1</h2>
                    </div>
                </div>
               
                <div>
                </div>
               </div>
               </div> */}
               
        </div>
        
    </div>
  )
}

export default Restaurants