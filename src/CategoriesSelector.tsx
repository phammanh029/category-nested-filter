import React, { useState } from 'react';
// import {withStyles} from '@material-ui/styles';
import { Box, withStyles, createStyles, List, ListItem, ListItemText, ListItemIcon, InputAdornment, Input, } from '@material-ui/core';
import { Search, ChevronRight } from '@material-ui/icons';


interface ICategory {
    id: string;
    name: string;
    description: string;
    image: string;
    thumbnail: string;
    parent_category_id: string;
    categories?: ICategory[];
}

interface IItemLevel {
    level: number;
    selectedCategory?: ICategory;
    categories: ICategory[];
}

const styles = createStyles({
    root: {

    },
    categoryItemIcon: {
        paddingLeft: 50
    },
    selectedCategory: {
        color: 'red',
    },
    category: {
        color: 'unset',
    }
});

interface ICategorySelectorProps {
    categories: ICategory[];
    filter?: (category: ICategory, query: string) => boolean;
}
const CategoriesSelector: React.FC<ICategorySelectorProps & {
    classes?: {
        categoryItemIcon: string;
        selectedCategory: string;
        category: string;
    }
}> = ({ classes, categories, filter = (item, query) => (!query || item.name.includes(query)), ...props }) => {

    const [filterText, setFilterText] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<ICategory>();
    const [levels, setLevels] = useState<IItemLevel[]>([{ level: 0, categories }]);

    const testCategoryMatch = (category: ICategory, query: string): boolean => {
        if (filter(category, query)) {
            return true;
        }

        if (!category.categories) {
            return false;
        }

        return category.categories.find((cat) => testCategoryMatch(cat, query)) != null;
    }

    const searchLevelMatch = (categories: ICategory[], query: string): IItemLevel => {
        const matchItems = categories.filter(cat => testCategoryMatch(cat, query));
        return { level: 0, categories: matchItems };
    }

    const handleFilterResult = (event: any) => {
        const val = event.target.value;
        setFilterText(val);
        // const lvs = levels.map((lv) => ({
        //     level: lv.level, selectedCategory: lv.selectedCategory,
        //     categories: lv.categories.filter((item: ICategory) => filter(item, filterText))
        // }));
        // setLevels(lvs);
        const lvs = [searchLevelMatch(categories, val)];
        // console.log(lvs);
        setLevels(lvs);
    };
    // handle on text change


    const handleListItemSelect = (itemLevel: number, item: ICategory) => {
        const lvs = [...levels.filter(level => level.level <= itemLevel),];
        // console.log(event);
        lvs[itemLevel].selectedCategory = item;
        if (item.categories) {
            // add more
            lvs.push({ level: itemLevel + 1, categories: item.categories.filter(it => filter(it, filterText)) });
            setSelectedItem(undefined);
        } else {
            setSelectedItem(item);
        }

        setLevels(lvs);

        // setLevels
    };

    return (
        <Box display='flex' width={1} flexDirection='column' p={1}>
            <Box display='flex' flexDirection='row'>
                <Box borderRadius={10} border={1}>
                    <Input startAdornment={<InputAdornment position='start'><Search /></InputAdornment>} value={filterText} onChange={handleFilterResult}></Input>
                </Box>
            </Box>
            <Box width={1} display='flex' flexDirection='row'>
                {
                    levels.map((level, index) => (
                        <Box key={index}>
                            <List>
                                {
                                    level.categories.map((category) => (
                                        <ListItem button className={category === level.selectedCategory ? classes?.selectedCategory : classes?.category} key={category.id} onClick={() => handleListItemSelect(level.level, category)}>
                                            <ListItemText>{category.name}</ListItemText>
                                            <ListItemIcon className={classes?.categoryItemIcon}><ChevronRight /></ListItemIcon>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Box>
                    ))
                }
            </Box>
            <Box>
                {selectedItem && (<div>{selectedItem.name}</div>)}
            </Box>
        </Box >
    );
};

export default withStyles(styles)(CategoriesSelector);