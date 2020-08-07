import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, AsyncStorage } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList(){
    const[isFilterVisibled, setIsFilterVisibled] = useState(false);

    const [teachers, setTeacher] = useState([]);
    const[favorites, setFavorites] = useState<number[]>([]);

    const[week_day, setWeekDay] = useState('');
    const[subject, setSubject] = useState('');
    const[time, setTime] = useState('');

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })

                setFavorites(favoritedTeachersIds);
            }
        });
    }

    useFocusEffect(
        React.useCallback(() => {
          loadFavorites();
        }, [])
      )

    function handleToogleFiltersVisible(){
        setIsFilterVisibled(!isFilterVisibled);
    }

    async function handleFilterSubmit(){
        loadFavorites();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        setIsFilterVisibled(false);
        setTeacher(response.data);
    }

    return(
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponíveis" 
                headerRigth={(
                    <BorderlessButton onPress={handleToogleFiltersVisible}>
                        <Feather name="filter" size={20} color="#fff"/>
                    </BorderlessButton>
                )}>
                { isFilterVisibled && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            style={styles.input}
                            placeholder="Qual a matéria?"
                            placeholderTextColor="#c1bccc"
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                    <TextInput
                                        value={week_day}
                                        onChangeText={text => setWeekDay(text)}
                                        style={styles.input}
                                        placeholder="Qual o dia?"
                                        placeholderTextColor="#c1bccc"
                                    />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                    <TextInput
                                        value={time}
                                        onChangeText={text => setTime(text)}
                                        style={styles.input}
                                        placeholder="Qual o horario?"
                                        placeholderTextColor="#c1bccc"
                                    />
                            </View>
                        </View>

                        <RectButton 
                            style={styles.submitButton}
                            onPress={handleFilterSubmit}
                        >
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

            <ScrollView 
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
                
            >
                {teachers.map((teacher: Teacher) =>  {
                    return (
                        <TeacherItem 
                            key={teacher.id} 
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    )
                })}
            </ScrollView>
        </View>
    );
}

export default TeacherList;