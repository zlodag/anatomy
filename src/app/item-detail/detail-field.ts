export class DetailField {
	key: string;
    label: string;
    array: boolean;
}

export const DETAIL_FIELDS : DetailField[] = [

  	{key: 'introduction', label: 'Introduction', array: false },
  	{key: 'structure', label: 'Structure', array: false },

  	{key: 'superiorRelations', label: 'Superior relations', array: true },
  	{key: 'inferiorRelations', label: 'Inferior relations', array: true },
  	{key: 'anteriorRelations', label: 'Anterior relations', array: true },
  	{key: 'posteriorRelations', label: 'Posterior relations', array: true },
  	{key: 'medialRelations', label: 'Medial relations', array: true },
  	{key: 'lateralRelations', label: 'Lateral relations', array: true },

  	{key: 'superiorBoundary', label: 'Superior boundary', array: false },
  	{key: 'inferiorBoundary', label: 'Inferior boundary', array: false },
  	{key: 'anteriorBoundary', label: 'Anterior boundary', array: false },
  	{key: 'posteriorBoundary', label: 'Posterior boundary', array: false },
  	{key: 'medialBoundary', label: 'Medial boundary', array: false },
  	{key: 'lateralBoundary', label: 'Lateral boundary', array: false },

  	{key: 'contents', label: 'Contents', array: true },
  	{key: 'articulations', label: 'Articulations', array: true },
  	{key: 'attachments', label: 'Attachments', array: true },
  	{key: 'specialStructures', label: 'Special structures', array: true },

  	{key: 'nerveSupply', label: 'Nerve supply', array: false },
  	{key: 'arterialSupply', label: 'Arterial supply', array: false },
  	{key: 'venousDrainage', label: 'Venous drainage', array: false },
  	{key: 'lymphaticDrainage', label: 'Lymphatic drainage', array: false },

  	{key: 'variants', label: 'Variants', array: true },

];