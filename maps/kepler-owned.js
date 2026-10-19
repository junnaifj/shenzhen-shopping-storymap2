(async function(){
  try {
    const dataset = new URLSearchParams(location.search).get('dataset') || 'n-sPxYJA';
    if (!['n-sPxYJA','n-j9YglN','n-PK8Lxr','n-RIDlOh','n-DD5I9p'].includes(dataset)) throw Error('Unknown dataset');
    const response = await fetch('../data/kepler/'+dataset+'.json');
    if(!response.ok) throw Error('Map data unavailable');
    const saved = await response.json();
    const loaded = KeplerGl.KeplerGlSchema.load(saved.datasets,saved.config);
    loaded.config.mapStyle = {...loaded.config.mapStyle,styleType:'owned-light'};
    const store = Redux.createStore(Redux.combineReducers({keplerGl:KeplerGl.keplerGlReducer.initialState({mapState:saved.config.config.mapState})}),Redux.applyMiddleware(...KeplerGl.enhanceReduxMiddleware([])));
    function App(){
      const [size,setSize]=React.useState({width:innerWidth,height:innerHeight});
      React.useEffect(()=>{const update=()=>setSize({width:innerWidth,height:innerHeight});addEventListener('resize',update);return()=>removeEventListener('resize',update)},[]);
      return React.createElement(KeplerGl.default,{id:'owned',...size,mapboxApiAccessToken:'',mapStylesReplaceDefault:true,mapStyles:[{id:'owned-light',label:'Light',url:new URL('light-style.json',location.href).href,icon:''}]});
    }
    ReactDOM.createRoot(document.getElementById('app')).render(React.createElement(ReactRedux.Provider,{store},React.createElement(App)));
    setTimeout(()=>{store.dispatch(KeplerGl.addDataToMap({...loaded,options:{centerMap:false,readOnly:false}}));store.dispatch(KeplerGl.updateMap(saved.config.config.mapState));},100);
    window.__OWNED_KEPLER__={store,dataset,sourceRows:saved.datasets.map(d=>d.data.allData.length)};
    document.getElementById('loading').style.display='none';
  } catch(error){document.getElementById('loading').style.display='none';const failure=document.getElementById('failure');failure.style.display='block';failure.textContent='Map could not load: '+error.message;console.error(error);}
})();
