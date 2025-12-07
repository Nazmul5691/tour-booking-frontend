import { useEffect, useState } from "react";

interface UseActionStateProps<T extends { id: string }> {
    entity?: T[];
    isEdit: boolean;
    open: boolean;
}

interface UseActionStateReturn<T extends { id: string }> {
    selectedIds: string[];
    removedIds: string[];
    currentId: string;
    setCurrentId: (id: string) => void;
    handleAdd: () => void;
    handleRemove: (id: string) => void;
    getNewItems: () => string[];
    getAvailableItems: (allItems: T[]) => T[];
}

/**
 * Generic hook to manage selection & removal state for entities.
 */
export const useActionState = <T extends { id: string }>({
    entity,
    isEdit,
    open,
}: UseActionStateProps<T>): UseActionStateReturn<T> => {
    const getInitialIds = (): string[] => {
        if (isEdit && entity) {
            return entity.map((e) => e.id);
        }
        return [];
    };

    const [selectedIds, setSelectedIds] = useState<string[]>(getInitialIds);
    const [removedIds, setRemovedIds] = useState<string[]>([]);
    const [currentId, setCurrentId] = useState<string>("");

    const handleAdd = () => {
        if (currentId && !selectedIds.includes(currentId)) {
            setSelectedIds([...selectedIds, currentId]);
            // If re-adding a removed item
            if (removedIds.includes(currentId)) {
                setRemovedIds(removedIds.filter((id) => id !== currentId));
            }
            setCurrentId("");
        }
    };

    const handleRemove = (id: string) => {
        setSelectedIds(selectedIds.filter((sid) => sid !== id));

        if (isEdit && entity) {
            const wasOriginal = entity.some((e) => e.id === id);
            if (wasOriginal && !removedIds.includes(id)) {
                setRemovedIds([...removedIds, id]);
            }
        }
    };

    const getNewItems = (): string[] => {
        if (!isEdit || !entity) return selectedIds;
        const originalIds = entity.map((e) => e.id);
        return selectedIds.filter((id) => !originalIds.includes(id));
    };

    const getAvailableItems = (allItems: T[]) => {
        return allItems.filter((i) => !selectedIds.includes(i.id));
    };

    useEffect(() => {
        if (open) {
            const initialIds = getInitialIds();
            setSelectedIds(initialIds);
            setRemovedIds([]);
            setCurrentId("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, entity]);

    return {
        selectedIds,
        removedIds,
        currentId,
        setCurrentId,
        handleAdd,
        handleRemove,
        getNewItems,
        getAvailableItems,
    };
};
