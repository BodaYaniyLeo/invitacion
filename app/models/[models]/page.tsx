// import { Model1 } from "@/archivosDescarte/Model1";

// const modelsComp: Record<string, React.ComponentType> = {
//     Model1
// }

// export function generateStaticParams() {
//     return [
//         { models: 'Model1' }
//     ];
// }

// export default async function Page({ params }: { params: Promise<{ models: string }> }) {
//     const { models } = await params;

//     const ModelsComponent = modelsComp[models];

//     if (!ModelsComponent) return <p>No hay portadas disponibles</p>;

//     return <ModelsComponent />

// }