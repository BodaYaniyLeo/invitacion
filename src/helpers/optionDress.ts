'use server';

import fs from 'fs';
import path from 'path';

export interface colorType {
    col: number;
    sat: string;
    bri: string;
}

export interface Option {
    name: string;
    url: string;
    color: colorType
}

export interface ArrayType {
    [key: string]: Option[];
}

export const optionDress = async (categories: string[], group: string): Promise<ArrayType[]> => {
    let temporalEl: ArrayType[] = [];

    categories.forEach(cat => {
        const subDirPath = path.join(process.cwd(), `public/dress/${group}/${cat}`);

        let imgList: Option[] = [];

        if (fs.existsSync(subDirPath)) {
            const filenames = fs.readdirSync(subDirPath);
            const pngImages = filenames.filter(file => file.endsWith('.png'));

            const capCat = cat.charAt(0).toUpperCase() + cat.slice(1);

            pngImages.forEach((filename: string) => {
                const nameEl = filename.replace('.png', '');

                imgList.push({
                    url: `/dress/${group}/${cat}/${filename}`,
                    name: `${nameEl}`,
                    color: { col: 0, sat: "100%", bri: "100%" }
                });
            });
        }

        temporalEl.push({
            [cat]: imgList
        });
    });

    return temporalEl;
};