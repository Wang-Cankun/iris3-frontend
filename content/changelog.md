---
title: Changelog
description: 'DeepMAPS Changes'
---

# Change Log

All notable changes to DeepMAPS will be documented in this page.

## [0.11.0] - 06/24/2021
 
### Added

- Include gene names when exporting images
- Email services
### Fixed

- Differential regulon calculation when selecting multiple cell clusters/types
- 

## [0.10.1] - 06/23/2021
 
### Added

- Detailed tooltip on box plots
- saving violin plot will add gene name
- hint to provide valid input for violin plots

## [0.10.0] - 06/17/2021
 
### Added

- User register/login module
- Public and private project section for permission control

## [0.9.0] - 06/10/2021
 
### Added

- cell-cell communication analysis using CellChat


### Changes

- layout improvements in the regulon page
- imporove UI actions about regulon details and its tables
- Renamed cell category to cell identity to refer the metadata about cells

### Fixed

- Minor bugs and typo fix

## [0.8.0] - 06/03/2021
 
### Added

- Homepage banner indicating DeepMAPS is under development
- deepmaps.net as fixed DeepMAPS URL

### Changes

- Redesigned custom cell selection section. Now it will display error message
- Show scatter plot color to grey if gene expression value is 0

### Fixed

- Job status not updated in single RNA page
- Only show remove all filters if there are any
- Fixed typos and minor layout bugs

## [0.7.0] - 05/27/2021
### Added

- Redesigned upload page
- Redesigned settings section in the calculation page
- Added loading progess for most of the analyses
- Hide pages and section if calculation is not complete or not started

### Changes

- Removed example homepage items and pages
- Changed calculating logics on the cytoscape network. Now it will load when users click on each cell type
- Re-factored functions and improved loading performance
- Updated Human PBMC 3k dataset as the example

### Fixed

- The update page URL not changing while clicking

## [0.6.0] - 05/18/2021
 
### Added

- Complete workflow to calculate regulons
- Add error message when selecting same clusters for differential analysis

### Changes

- Updated regulon page layout
- Changed network default design
- Changed card title design

### Fixed

- Loading texts
- Only highlight selected regulons

## [0.5.0] - 05/13/2021
 
### Added

- Cytoscape: select to highlight genes; reset network; export to JPG, PNG, or CSV
- Example regulon activity
- Example regulon gene expression
- Gene set enrichment analysis using EnrichR
- Example regulon heatmap

### Changes

- Update regulon page layout
- Loading page design to display progress

### Fixed

- Data table to auto adjust card height


## [0.4.0] - 05/06/2021
 
### Added

- Show job running progess during loading, utilized socket-io and redis
- Show file upload progress during loading
- Allow download figures and tables
- Interactive scatter plot for clustering and gene expression

### Changes

- Updated all grid items with the same header/title style

### Fixed

- Too many digits in DEG results
- Align the 'RENAME' button within settings section
- Update info not clear
- Example data naming error
- Set default clustering method to HGT

## [0.3.0] - 04/29/2021

### Added

- Allow users to upload custom dataset
- Run custom datasets on single dataset mode, multiple datasets mode, 10x matched scRNA+ATAC-seq mode
- Built Docker images for R and Python backend

### Changes

- Use [JASPAR binding sites database](http://jaspar.genereg.net/genome-tracks/) for motif tasks
- Updated new HGT backend workflow

### Fixed

- API returns too many digits of data
- Replaced example cell label with healthy/disease
- Renamed gene regulatory network title
- Minor typos and layout changes

## [0.2.0] - 04/15/2021

### Added

- Options to select assay in plotting genes and DEGs
- GAS assay and using HGT clusters for default in matched data
- p-value cutoff in DEGs
- Example network and basic settings adjustment using Cytoscape.js
- 7 graph layout algorithms in Cytoscape.js
- Connected HGT logic in backend server
- Coverage plot in matched data
- Enable 'group by' option in generating violin plots
- Enable search function in variable genes table

### Fixed

- Static plot to adjust based on grid item resize event
- Gene-gene correlation function not working

## [0.1.0] - 04/01/2021

DeepMAPS is online at [https://bmbls.bmi.osumc.edu/deepmaps/](https://bmbls.bmi.osumc.edu/deepmaps/)

### Added

- Allow partial select cell labels or genes for regulon inference
- New homepage UI design
- Redis message queue
- R package for API calling
- Interactive Boxplot & Bar plot