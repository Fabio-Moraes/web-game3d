import { useStore } from "../hooks/useStore"

export const Menu = () => {
	const [saveWorld, resetWorld, saveMap, loadMap] = useStore((state) => [state.saveWorld, state.resetWorld, state.cubes, state.loadMap])

	const exportData = () => {
		const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
			JSON.stringify(saveMap)
		)}`;
		const link = document.createElement("a");
		link.href = jsonString;
		link.download = "data.json";

		link.click();
	};

	return (<div className="menu absolute">
		<button onClick={exportData}>Salvar</button>
		<button onClick={loadMap}>Carregar</button>
		{/* 	<button
			onClick={() => saveWorld()}
		>Save</button>
		<button
			onClick={() => resetWorld()}
		>Reset</button> */}
	</div>)
}