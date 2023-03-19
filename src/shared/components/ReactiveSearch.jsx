import React, { useState, useRef, useEffect } from "react";
import { Alert, Form } from "react-bootstrap";
import _ from "lodash";
import styles from "./ReactiveSearch.module.css";

const ReactiveSearch = ({
	id,
	items,
	headerLabel,
	selectionLabel = "Select item",
	idPath = "",
	valuePath = "",
	error,
	onChange: handleItemChange,
}) => {
	const [selectedItem, setSelectedItem] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [showSearchBox, setShowSearchBox] = useState(false);
	const searchContainerRef = useRef();

	const handleChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleItemClick = (item) => {
		setSelectedItem(item);
		handleItemChange(_.get(item, idPath));
		setSearchTerm("");
		setShowSearchBox(false);
	};

	const handleLabelClick = () => {
		setShowSearchBox(!showSearchBox);
	};

	const handleDocumentClick = (event) => {
		if (!searchContainerRef.current.contains(event.target)) {
			setShowSearchBox(false);
			setSearchTerm("");
		}
	};

	const handleCreateNewClick = () => {
		window.open("https://example.com/new");
	};

	const handleRefreshClick = () => {
		alert("Refresh button clicked!");
	};

	useEffect(() => {
		document.addEventListener("click", handleDocumentClick);
		return () => {
			document.removeEventListener("click", handleDocumentClick);
		};
	}, []);

	const filteredItems = items.filter((item) =>
		_.get(item, valuePath)?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const displayLabel = _.get(selectedItem, valuePath) || selectionLabel;

	return (
		<Form.Group className="mb-3" controlId={id}>
			<Form.Label>{headerLabel}</Form.Label>
			<div className={styles.searchContainer} ref={searchContainerRef}>
				<div
					className={styles.labelContainer}
					onClick={handleLabelClick}
				>
					<span>{displayLabel}</span>
					<span className={styles.dropdownArrow} />
				</div>
				<button
					className={styles.refreshButton}
					onClick={handleRefreshClick}
				>
					Refresh
				</button>
				{showSearchBox && (
					<div className={styles.searchBox}>
						<input
							type="text"
							className={styles.searchInput}
							placeholder="Search..."
							value={searchTerm}
							onChange={handleChange}
						/>
						<ul className={styles.searchList}>
							{filteredItems.map((item) => (
								<li
									key={_.get(item, idPath)}
									className={styles.searchListItem}
									onClick={() => handleItemClick(item)}
								>
									{_.get(item, valuePath)}
								</li>
							))}
						</ul>
						<div
							className={`${styles.searchListItem} ${styles.createNew}`}
							onClick={handleCreateNewClick}
						>
							Create New
						</div>
					</div>
				)}
			</div>
			{error && <Alert variant="danger">{error}</Alert>}
		</Form.Group>
	);
};

export default ReactiveSearch;
