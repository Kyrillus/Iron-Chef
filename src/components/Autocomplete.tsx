import React, {Dispatch, SetStateAction} from 'react'
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList, AutoCompleteTag,
    AutoCompleteCreatable
} from "@choc-ui/chakra-autocomplete";

interface autoCompleteProps {
    items: string[],
    placeholder: string
    setItems: Dispatch<SetStateAction<string[] | undefined>>
}

export default function Autocomplete({items, placeholder, setItems}: autoCompleteProps) {

    return (
            <AutoComplete creatable restoreOnBlurIfEmpty={false} onChange={vals => setItems(vals)} multiple openOnFocus>
                <AutoCompleteInput placeholder={placeholder}>
                    {({ tags }) =>
                        tags.map((tag, tid) => (
                            <AutoCompleteTag
                                key={tid}
                                label={tag.label}
                                onRemove={tag.onRemove}
                            />
                        ))
                    }
                </AutoCompleteInput>
                <AutoCompleteList>
                    {items.map((item, index) => (
                        <AutoCompleteItem
                            key={`option-${index}`}
                            value={item}
                            textTransform="capitalize"
                        >
                            {item}
                        </AutoCompleteItem>
                    ))}
                    <AutoCompleteCreatable>
                        {({ value }) => <span className="text-emerald-600">Add {value} to List</span>}
                    </AutoCompleteCreatable>
                </AutoCompleteList>
            </AutoComplete>
    );
}