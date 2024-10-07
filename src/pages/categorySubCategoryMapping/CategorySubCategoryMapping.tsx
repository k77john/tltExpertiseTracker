import { useEffect, useState } from 'react'
import {
    DeleteIcon,
    DownArrow,
    EditWhiteIcon,
    EyeWhiteIcon,
} from '../../assets/icons'
import { CustomModal, Header, ListingDetails, Loader } from '../../components'
import {
    CategorySubCategoryMapping as CategorySubCategoryMappingTypes,
    DomainSubDomainMappingTree,
} from '../../constants/types'
import { getCategorySubCategoryMappingsByID } from '../../services/categorySubCategoryMapping.services'
import { useAppDispatch, useAppSelector } from '../../store'
import { getCategoriesSubCategoriesAction } from '../../store/reducersAndActions/categoriesSubCategoriesMapping/categoriesSubCategories.actions'
import ErrorBoundary from '../../utils/ErrorBoundary'
import { CategorySubCategoryMappingActions } from './components'

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'

const CategorySubCategoryMapping = () => {
    const { loading, categoriesSubCategories } = useAppSelector(
        (state) => state.categoriesSubCategories
    )
    const [loader, setLoader] = useState(false)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCategoriesSubCategoriesAction())
    }, [])

    const [selectedMapping, setselectedMapping] =
        useState<CategorySubCategoryMappingTypes>()

    const [addMappingModalOpen, setaddMappingModalOpen] =
        useState<boolean>(false)

    const [editMappingModalOpen, setEditMappingModalOpen] =
        useState<boolean>(false)
    const editHandler = (item: CategorySubCategoryMappingTypes) => {
        setEditMappingModalOpen(true)
        setselectedMapping(item)
    }

    const [deleteMappingModalOpen, setDeleteMappingModalOpen] =
        useState<boolean>(false)
    const deleteHandler = (item: CategorySubCategoryMappingTypes) => {
        setDeleteMappingModalOpen(true)
        setselectedMapping(item)
    }

    const [viewDetailsModalOpen, setViewDetailsModalOpen] =
        useState<boolean>(false)
    const viewDetailsHandler = async (id: number | undefined) => {
        setLoader(true)
        const resp = await getCategorySubCategoryMappingsByID(id)
        if (resp) {
            setLoader(false)
            if (resp.isSuccessful) {
                setViewDetailsModalOpen(true)
                setselectedMapping(resp.data)
            }
        }
    }

    const [filteredOptions, setFilteredOptions] = useState<
        DomainSubDomainMappingTree[]
    >([])

    const getCategoryMapingLabel = (
        option: (typeof categoriesSubCategories)[0]
    ) => option.domain.categoryName || ''

    const [categoryExpanded, setCategoryExpanded] = useState<string | false>(
        false
    )
    const [subCategoryExpanded, setSubCategoryExpanded] = useState<
        string | false
    >(false)
    const handleOpenCategory =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setCategoryExpanded(isExpanded ? panel : false)
        }

    const handleOpenSubCategory =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setSubCategoryExpanded(isExpanded ? panel : false)
        }

    useEffect(() => {
        setFilteredOptions(categoriesSubCategories)
    }, [categoriesSubCategories])

    return (
        <div className="h-full">
            {loading && <Loader />}
            {loader && <Loader />}

            <Header
                title="Manage Mapping"
                buttonTitle="+ Add Mapping"
                onClick={() => setaddMappingModalOpen(true)}
                options={categoriesSubCategories}
                getOptionLabel={getCategoryMapingLabel}
                setFilteredOptions={setFilteredOptions}
                searchBar
            />
            <ErrorBoundary>
                <div
                    style={{ height: 'calc(100% - 128px)' }}
                    className="bg-white-color gap-4 flex flex-col"
                >
                    {/* <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left  text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Domain
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Sub Domain
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Mapping
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-end"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOptions.map((item) => (
                                    <tr
                                        key={item.mappingId}
                                        className="bg-white border-b "
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                        >
                                            {item.categoryName}
                                        </th>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                        >
                                            {item.subCategoryName}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.isActive ? (
                                                <p className="lg:px-2 md:px-2 px-1 py-1 text-white bg-primary-color rounded-md text-xs text-center w-fit">
                                                    Active
                                                </p>
                                            ) : (
                                                <p className=" lg:px-2 md:px-2 px-1 py-1 text-red-700 bg-red-200 rounded-md text-xs text-center w-fit">
                                                    Inactive
                                                </p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 md:max-w-80 lg:max-w-80 text-xs">
                                            <p className="line-clamp-2">
                                                {item.description}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 flex gap-4 justify-end">
                                            <div
                                                onClick={() =>
                                                    editHandler(item)
                                                }
                                                className="h-8 w-8 flex items-center justify-center p-2 rounded-full bg-primary-color cursor-pointer"
                                            >
                                                <img
                                                    className="h-4/5 w-4/5"
                                                    src={EditWhiteIcon}
                                                />
                                            </div>
                                            <div
                                                onClick={() =>
                                                    viewDetailsHandler(
                                                        item.mappingId
                                                    )
                                                }
                                                className="h-8 w-8 flex items-center justify-center p-2 rounded-full bg-gray-700 cursor-pointer"
                                            >
                                                <img
                                                    className="h-4/5 w-4/5"
                                                    src={EyeWhiteIcon}
                                                />
                                            </div>
                                            <div
                                                onClick={() =>
                                                    deleteHandler(item)
                                                }
                                                className="h-8 w-8 flex items-center justify-center p-2 rounded-full bg-red-200 cursor-pointer"
                                            >
                                                <img
                                                    className="h-4/5 w-4/5"
                                                    src={DeleteIcon}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> */}
                    {/* <div className="p-4 flex flex-col gap-4 overflow-x-auto">
                        {filteredOptions.map((item) => (
                            <div
                                key={item.domain.categoryID}
                                className="p-4 bg-gray-100 flex flex-col gap-4 rounded-lg"
                            >
                                <p className="font-bold text-base">
                                    {item.domain.categoryName}
                                </p>
                                <div className="flex flex-col gap-4">
                                    {item.subDomains.map((subDomainItem) => (
                                        <div
                                            key={
                                                subDomainItem.subDomain
                                                    .subCategoryID
                                            }
                                            className="p-4 bg-white rounded-lg flex flex-col gap-4"
                                        >
                                            <p className="font-semibold text-base">
                                                {
                                                    subDomainItem.subDomain
                                                        .subCategoryName
                                                }
                                            </p>
                                            <div className="flex flex-col gap-4">
                                                {subDomainItem.mappings.map(
                                                    (mappingItem) => (
                                                        <div
                                                            key={
                                                                mappingItem.mappingId
                                                            }
                                                            className="flex justify-between items-center px-4 py-2 border border-gray-200 rounded-lg"
                                                        >
                                                            <div className="flex gap-4 items-center w-[80%]">
                                                                <p className="text-sm w-[60%]">
                                                                    {
                                                                        mappingItem.description
                                                                    }
                                                                </p>
                                                                {mappingItem.isActive ? (
                                                                    <p className="lg:px-2 md:px-2 px-1 py-1 text-white bg-primary-color rounded-md text-xs text-center w-fit">
                                                                        Active
                                                                    </p>
                                                                ) : (
                                                                    <p className=" lg:px-2 md:px-2 px-1 py-1 text-red-700 bg-red-200 rounded-md text-xs text-center w-fit">
                                                                        Inactive
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <div className="flex gap-3 justify-end items-center">
                                                                <div
                                                                    onClick={() =>
                                                                        editHandler(
                                                                            mappingItem
                                                                        )
                                                                    }
                                                                    className="h-8 w-8 flex items-center justify-center p-2 rounded-full bg-primary-color cursor-pointer"
                                                                >
                                                                    <img
                                                                        className="h-4/5 w-4/5"
                                                                        src={
                                                                            EditWhiteIcon
                                                                        }
                                                                    />
                                                                </div>
                                                                <div
                                                                    onClick={() =>
                                                                        viewDetailsHandler(
                                                                            mappingItem.mappingId
                                                                        )
                                                                    }
                                                                    className="h-8 w-8 flex items-center justify-center p-2 rounded-full bg-gray-700 cursor-pointer"
                                                                >
                                                                    <img
                                                                        className="h-4/5 w-4/5"
                                                                        src={
                                                                            EyeWhiteIcon
                                                                        }
                                                                    />
                                                                </div>
                                                                <div
                                                                    onClick={() =>
                                                                        deleteHandler(
                                                                            mappingItem
                                                                        )
                                                                    }
                                                                    className="h-8 w-8 flex items-center justify-center p-2 rounded-full bg-red-200 cursor-pointer"
                                                                >
                                                                    <img
                                                                        className="h-4/5 w-4/5"
                                                                        src={
                                                                            DeleteIcon
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div> */}
                    <div className="p-4 overflow-x-auto">
                        {filteredOptions.map((item, i) => (
                            <Accordion
                                expanded={
                                    categoryExpanded ===
                                    `${item.domain.categoryID}-${i}`
                                }
                                onChange={handleOpenCategory(
                                    `${item.domain.categoryID}-${i}`
                                )}
                            >
                                <AccordionSummary
                                    expandIcon={
                                        <img
                                            className="h-4 w-4"
                                            src={DownArrow}
                                        />
                                    }
                                    aria-controls="panel2-content"
                                    id="panel1d-header"
                                >
                                    <p className="font-bold text-base">
                                        {item.domain.categoryName}
                                    </p>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {categoryExpanded ===
                                        `${item.domain.categoryID}-${i}` && (
                                        <>
                                            {item.subDomains.map(
                                                (subDomainItem, index) => (
                                                    <Accordion
                                                        expanded={
                                                            subCategoryExpanded ===
                                                            `${subDomainItem.subDomain.subCategoryID}-${index}`
                                                        }
                                                        onChange={handleOpenSubCategory(
                                                            `${subDomainItem.subDomain.subCategoryID}-${index}`
                                                        )}
                                                    >
                                                        <AccordionSummary
                                                            expandIcon={
                                                                <img
                                                                    className="h-4 w-4"
                                                                    src={
                                                                        DownArrow
                                                                    }
                                                                />
                                                            }
                                                            aria-controls="panel1-content"
                                                            id="panel1-header"
                                                        >
                                                            <p className="font-semibold text-sm">
                                                                {
                                                                    subDomainItem
                                                                        .subDomain
                                                                        .subCategoryName
                                                                }
                                                            </p>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            {subCategoryExpanded ===
                                                                `${subDomainItem.subDomain.subCategoryID}-${index}` && (
                                                                <div className="flex flex-col gap-4">
                                                                    {subDomainItem.mappings.map(
                                                                        (
                                                                            mappingItem
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    mappingItem.mappingId
                                                                                }
                                                                                className="flex justify-between items-center px-4 py-2 border border-gray-200 rounded-lg"
                                                                            >
                                                                                <div className="flex gap-4 items-center w-[80%]">
                                                                                    <p className="text-sm w-[60%]">
                                                                                        {
                                                                                            mappingItem.description
                                                                                        }
                                                                                    </p>
                                                                                    {mappingItem.isActive ? (
                                                                                        <p className="lg:px-2 md:px-2 px-1 py-1 text-white bg-primary-color rounded-md text-xs text-center w-fit">
                                                                                            Active
                                                                                        </p>
                                                                                    ) : (
                                                                                        <p className=" lg:px-2 md:px-2 px-1 py-1 text-red-700 bg-red-200 rounded-md text-xs text-center w-fit">
                                                                                            Inactive
                                                                                        </p>
                                                                                    )}
                                                                                </div>
                                                                                <div className="flex gap-3 justify-end items-center">
                                                                                    <div
                                                                                        onClick={() =>
                                                                                            editHandler(
                                                                                                mappingItem
                                                                                            )
                                                                                        }
                                                                                        className="h-8 w-8 flex items-center justify-center p-2 rounded-full bg-primary-color cursor-pointer"
                                                                                    >
                                                                                        <img
                                                                                            className="h-4/5 w-4/5"
                                                                                            src={
                                                                                                EditWhiteIcon
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                    <div
                                                                                        onClick={() =>
                                                                                            viewDetailsHandler(
                                                                                                mappingItem.mappingId
                                                                                            )
                                                                                        }
                                                                                        className="h-8 w-8 flex items-center justify-center p-2 rounded-full bg-gray-700 cursor-pointer"
                                                                                    >
                                                                                        <img
                                                                                            className="h-4/5 w-4/5"
                                                                                            src={
                                                                                                EyeWhiteIcon
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                    <div
                                                                                        onClick={() =>
                                                                                            deleteHandler(
                                                                                                mappingItem
                                                                                            )
                                                                                        }
                                                                                        className="h-8 w-8 flex items-center justify-center p-2 rounded-full bg-red-200 cursor-pointer"
                                                                                    >
                                                                                        <img
                                                                                            className="h-4/5 w-4/5"
                                                                                            src={
                                                                                                DeleteIcon
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
                                                            )}
                                                        </AccordionDetails>
                                                    </Accordion>
                                                )
                                            )}
                                        </>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                </div>
                {addMappingModalOpen && (
                    <CustomModal
                        title="Add Mapping"
                        open={addMappingModalOpen}
                        onClose={() => setaddMappingModalOpen(false)}
                        children={
                            <CategorySubCategoryMappingActions
                                action="Add"
                                setModal={setaddMappingModalOpen}
                            />
                        }
                    />
                )}

                {editMappingModalOpen && (
                    <CustomModal
                        title="Edit Mapping"
                        open={editMappingModalOpen}
                        onClose={() => setEditMappingModalOpen(false)}
                        children={
                            <CategorySubCategoryMappingActions
                                action="Edit"
                                data={selectedMapping}
                                setModal={setEditMappingModalOpen}
                            />
                        }
                    />
                )}

                {deleteMappingModalOpen && (
                    <CustomModal
                        title="Delete Mapping"
                        open={deleteMappingModalOpen}
                        onClose={() => setDeleteMappingModalOpen(false)}
                        children={
                            <CategorySubCategoryMappingActions
                                action="Delete"
                                data={selectedMapping}
                                setModal={setDeleteMappingModalOpen}
                            />
                        }
                    />
                )}
                {viewDetailsModalOpen && (
                    <CustomModal
                        title={selectedMapping?.description}
                        open={viewDetailsModalOpen}
                        onClose={() => setViewDetailsModalOpen(false)}
                        children={
                            <ListingDetails
                                Mapping={selectedMapping || {}}
                                detailsFor="Mapping"
                            />
                        }
                    />
                )}
            </ErrorBoundary>
        </div>
    )
}

export default CategorySubCategoryMapping
